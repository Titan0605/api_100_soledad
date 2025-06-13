from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api
from bson import ObjectId

bp = Blueprint("api_characters", __name__)
search_model = SearchingModel()

@bp.route("/characters-search", methods=["POST"])
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

@bp.route("/search-specific-characters/<id>", methods=['GET'])
def specific_character(id):
    character_id = id
    if not character_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

    character = search_model.search_especific(character_id, "personajes")

    if not character:
        return jsonify({
            "status": "error",
            "message": "Character was not found"
        }), 404
    
    character["eventos_principales"] = iterate_arrays_api(character.get("eventos_principales", []), "eventos")
    character["type"] = "characters"
    character["_id"] = str(character["_id"])
    return jsonify({
        "status": "successful",
        "message": "character was found successfuly",
        "type": "characters",
        "results": character
    }), 200

@bp.route("/insert/characters", methods=['POST'])
def create_character():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['nombre', 'apellido', 'generacion', 'descripcion_fisica', 'personalidad', 'capitulos_aparicion']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Insert the character
    success, inserted_id = search_model.insert_document("personajes", data)

    if success:
        return jsonify({
            "status": "successful",
            "message": "Character created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error",
            "message": f"Error creating character: {inserted_id}"
        }), 500

@bp.route("/characters-list", methods=["GET"])
def list_characters():
    characters_cursor = search_model.get_essential("personajes")
    if not characters_cursor or isinstance(characters_cursor, str):  # Handling error case where a string is returned
        return jsonify({
            "status": "error",
            "message": "No characters found" if not characters_cursor else characters_cursor
        }), 404
    
    character_results = []
    for doc in characters_cursor:
        if isinstance(doc, dict) and '_id' in doc:
            character_results.append({
                "id": str(doc['_id']),
                "nombre": doc.get('nombre', '')
            })
    
    return jsonify({
        "status": "successful",
        "message": "Characters retrieved successfully",
        "results": character_results
    }), 200

def update_characters(id, dictionary):
    return search_model.update(id, "personajes", dictionary)