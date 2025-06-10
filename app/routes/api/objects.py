from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_objects", __name__)
search_model = SearchingModel()

@bp.route("/objects-search", methods=['POST'])
def objects_search():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({
            "status": "error",
            "message": "missing data or query field"
            }), 400
    
    user_query = data.get("query", "")

    objects_cursor = search_model.search_general(user_query, "objetos")
    if not objects_cursor:
        return jsonify({
            "status": "error",
            "message": "No object was found"
        }), 404
    
    objects_results = []
    for doc in objects_cursor:
        doc["propietarios"] = iterate_arrays_api(doc.get("propietarios", []), "personajes")
        doc["type"] = "objects"
        doc["_id"] = str(doc["_id"])
        objects_results.append(doc)

    return  jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "objects",
        "results": objects_results
    }), 200

@bp.route("/search-especific-object", methods=["POST"])
def specific_object():
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400
    
    object_id = data.get("id")

    object = search_model.search_especific(object_id, "objetos")

    if not object:
        return jsonify({
            "status": "error",
            "message": "location was not found"
        }), 404
    
    object["propietarios"] = iterate_arrays_api(object.get("propietarios", []), "personajes")
    object["type"] = "objects"
    object["_id"] = str(object["_id"])

    return jsonify({
        "status": "successful",
        "message": "location was found successfuly",
        "type": "objects",
        "results": object
    }), 200

def update_objects(id, dictionary):
    return search_model.update(id, "objetos", dictionary)