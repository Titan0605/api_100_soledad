from flask import Blueprint, request, jsonify
from models import SearchingModel
from utils import iterate_arrays_api

bp = Blueprint("api_events", __name__)
search_model = SearchingModel()

@bp.route("/events-search", methods=['GET'])
def search_events():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"status": "error", "message": "You must send something a 'query' field in JSON"}), 400
    
    user_query = data.get('query', '')
    events_cursor = search_model.search_general(user_query, "eventos")

    if not events_cursor:
        return jsonify({
            "status": "error",
            "message": "No event was found"
        }), 404

    events_results = []
    for doc in events_cursor:
        doc["personajes_involucrados"] = iterate_arrays_api(doc.get("personajes_involucrados", []),"personajes")
        doc["localizaciones"] = iterate_arrays_api(doc.get("localizaciones", []), "localizaciones")
        doc["objetos_relacionados"] = iterate_arrays_api(doc.get("objetos_relacionados", []), "objetos")
        doc["_id"] = str(doc["_id"])
        events_results.append(doc)
    
    return jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "events",
        "results": events_results
    }), 200

bp.route("/search-specific-event", methods=["GET"])
def specific_event():
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400
    
    event_id = data.get("id")

    event = search_model.search_especific(event_id, "eventos")

    if not event:
        return jsonify({
            "status": "error",
            "message": "Event was not found"
        }), 404

    event["personajes_involucrados"] = iterate_arrays_api(event.get("personajes_involucrados", []),"personajes")
    event["localizaciones"] = iterate_arrays_api(event.get("localizaciones", []), "localizaciones")
    event["objetos_relacionados"] = iterate_arrays_api(event.get("objetos_relacionados", []), "objetos")
    event["_id"] = str(event["_id"])


    return jsonify({
        "status": "successful",
        "message": "Event was found successfuly",
        "type": "events",
        "results": event
    }), 200