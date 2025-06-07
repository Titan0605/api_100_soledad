from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_characters", __name__)
search_model = SearchingModel()

@bp.route("/characters-search")
def search_characters():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({
            "status": "error",
            "message": "No data was sent or missing query field"
        })
    
    user_query = data.get("query")

    characters_cursor = search_model.search_general(user_query, "personajes")

    if not characters_cursor:
        return jsonify({
            "status": "error",
            "message": "No event was found"
            }), 404

    character_results = []
    for doc in characters_cursor:
        doc["eventos_principales"] = iterate_arrays_api(doc.get("eventos_principales", []), "eventos")
        doc["type"] = "characters"
        doc["_id"] = str(doc["_id"])
        character_results.append(doc)
    
    return jsonify({
        "status": "successful",
        "message": "Request was successful",
        "type": "characters",
        "results": character_results
    }), 200

@bp.route("/search-especific-character", methods=['GET'])
def search_especific_character():
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400
    
    character_id = data.get("id")

    character = search_model.search_especific(character_id, "personajes")

    if not character:
        return jsonify({
            "status": "error",
            "message": "Character was not found"
        }), 404
    
    character["eventos_principales"] = iterate_arrays_api(character.get("eventos_principales", []), "eventos")
    character["type"] = ""
    character["_id"] = str(character["_id"])
    return jsonify({
        "status": "successful",
        "message": "character was found successfuly",
        "type": "characters",
        "results": character
    }), 200