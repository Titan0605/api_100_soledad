from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_events", __name__)
search_model = SearchingModel()

@bp.route("/events-search", methods=['POST'])
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
        doc["type"] = "events"
        doc["_id"] = str(doc["_id"])
        events_results.append(doc)
    
    return jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "events",
        "results": events_results
    }), 200

@bp.route("/search-specific-events/<id>", methods=["GET"])
def specific_event(id):
    event_id = id
    if not event_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

    event = search_model.search_especific(event_id, "eventos")

    if not event:
        return jsonify({
            "status": "error",
            "message": "Event was not found"
        }), 404

    event["personajes_involucrados"] = iterate_arrays_api(event.get("personajes_involucrados", []),"personajes")
    event["localizaciones"] = iterate_arrays_api(event.get("localizaciones", []), "localizaciones")
    event["objetos_relacionados"] = iterate_arrays_api(event.get("objetos_relacionados", []), "objetos")
    event["type"] = "events"
    event["_id"] = str(event["_id"])


    return jsonify({
        "status": "successful",
        "message": "Event was found successfuly",
        "type": "events",
        "results": event
    }), 200

def update_events(id, dictionary):
    return search_model.update(id, "eventos",dictionary)

@bp.route("/insert/events", methods=['POST'])
def create_event():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['nombre', 'descripcion', 'capitulo', 'importancia', 'tipo']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Insert the event
    success, inserted_id = search_model.insert_document("eventos", data)

    if success:
        return jsonify({
            "status": "successful", 
            "message": "Event created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error",
            "message": f"Error creating event: {inserted_id}"
        }), 500