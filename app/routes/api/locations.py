from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_locations", __name__)
search_model = SearchingModel()

@bp.route("/locations-search", methods=['GET'])
def locations_search():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({
            "status": "error",
            "message": "missing data or query field"
            }), 400
    
    user_query = data.get("query", "")

    locations_cursor = search_model.search_general(user_query, "localizaciones")
    if not locations_cursor:
        return jsonify({
            "status": "error",
            "message": "No event was found"
        }), 404
    
    locations_results = []
    for doc in locations_cursor:
        doc["eventos_importantes"] = iterate_arrays_api(doc.get("eventos_importantes", []), "eventos")
        doc["personajes_asociados"] = iterate_arrays_api(doc.get("personajes_asociados", []), "personajes")
        doc["type"] = "locations"
        doc["_id"] = str(doc["_id"])
        locations_results.append(doc)

    return  jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "locations",
        "results": locations_results
    }), 200

@bp.route("/search-especific-location", methods=["GET"])
def specific_location():
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400
    
    location_id = data.get("id")

    location = search_model.search_especific(location_id, "localizaciones")

    if not location:
        return jsonify({
            "status": "error",
            "message": "location was not found"
        }), 404
    
    location["eventos_importantes"] = iterate_arrays_api(location.get("eventos_importantes", []), "eventos")
    location["personajes_asociados"] = iterate_arrays_api(location.get("personajes_asociados", []), "personajes")
    location["type"] = "locations"
    location["_id"] = str(location["_id"])

    return jsonify({
        "status": "successful",
        "message": "location was found successfuly",
        "type": "locations",
        "results": location
    }), 200