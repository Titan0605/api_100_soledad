from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_dreams_visions", __name__)
search_model = SearchingModel()

@bp.route("/dreams-visions-search", methods=['GET'])
def dreams_visions_search():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({
            "status": "error",
            "message": "missing data or query field"
            }), 400
    
    user_query = data.get("query", "")

    dreams_visions_cursor = search_model.search_general(user_query, "objetos")
    if not dreams_visions_cursor:
        return jsonify({
            "status": "error",
            "message": "No object was found"
        }), 404
    
    dreams_visions_results = []
    for doc in dreams_visions_cursor:
        doc["soñador"] = iterate_arrays_api(doc.get("soñador", []), "personajes")
        doc["type"] = "dreams_visions"
        doc["_id"] = str(doc["_id"])
        dreams_visions_results.append(doc)

    return  jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "dreams_visions",
        "results": dreams_visions_results
    }), 200

@bp.route("/search-especific-dream-vision", methods=["GET"])
def search_especific_object():
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400
    
    dream_vision_id = data.get("id")

    dream_vision = search_model.search_especific(dream_vision_id, "localizaciones")

    if not dream_vision:
        return jsonify({
            "status": "error",
            "message": "vision or dream was not found"
        }), 404
    
    dream_vision["soñador"] = iterate_arrays_api(dream_vision.get("soñador", []), "personajes")
    dream_vision["type"] = "dreams_visions"
    dream_vision["_id"] = str(dream_vision["_id"])

    return jsonify({
        "status": "successful",
        "message": "the object was found successfuly",
        "type": "dreams_visions",
        "results": dream_vision
    }), 200