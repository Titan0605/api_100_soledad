from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api
from bson import ObjectId

bp = Blueprint("api_locations", __name__)
search_model = SearchingModel()

@bp.route("/locations-search", methods=['POST'])
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
        }, 404)
    
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

@bp.route("/search-specific-locations/<id>", methods=["GET"])
def specific_location(id):
    location_id = id
    if not location_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

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

@bp.route("/insert/locations", methods=['POST'])
def create_location():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['nombre', 'tipo', 'descripcion', 'capitulos_aparicion']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Convert IDs to ObjectId
    if 'eventos_importantes' in data:
        data['eventos_importantes'] = [ObjectId(id) for id in data['eventos_importantes']]
    if 'personajes_asociados' in data:
        data['personajes_asociados'] = [ObjectId(id) for id in data['personajes_asociados']]

    # Insert the location
    success, inserted_id = search_model.insert_document("localizaciones", data)

    if success:
        return jsonify({
            "status": "successful",
            "message": "Location created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error",
            "message": f"Error creating location: {inserted_id}"
        }), 500

@bp.route("/locations-list", methods=["GET"])
def list_locations():
    locations_cursor = search_model.get_essential("localizaciones")
    if not locations_cursor or isinstance(locations_cursor, str):
        return jsonify({
            "status": "error",
            "message": "No locations found" if not locations_cursor else locations_cursor
        }), 404
    
    location_results = []
    for doc in locations_cursor:
        if isinstance(doc, dict) and '_id' in doc:
            location_results.append({
                "id": str(doc['_id']),
                "nombre": doc.get('nombre', '')
            })
    
    return jsonify({
        "status": "successful",
        "message": "Locations retrieved successfully",
        "results": location_results
    }), 200

def update_locations(id, dictionary):
    return search_model.update(id, "localizaciones", dictionary)