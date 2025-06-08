from flask import Blueprint, request, jsonify
from app.models import SearchingModel

bp = Blueprint("api_relationships", __name__)
search_model = SearchingModel()

@bp.route("/relationships-search", methods=["POST"])
def search_relationships():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({
            "status": "error",
            "message": "No data was sent or missing query field"
        })
    
    user_query = data.get("query")

    relationships_cursor = search_model.search_general(user_query, "personajes")

    if not relationships_cursor:
        return jsonify({
            "status": "error",
            "message": "No event was found"
            }), 404

    relationships_results = []
    for doc in relationships_cursor:
        doc["personaje1"] = search_model.search_especific(str(doc.get("personaje1", "")), "personajes")
        doc["personaje2"] = search_model.search_especific(str(doc.get("personaje2", "")), "personajes")
        doc["type"] = "relationships"
        doc["_id"] = str(doc["_id"])
        relationships_results.append(doc)
    
    return jsonify({
        "status": "successful",
        "message": "Request was successful",
        "type": "relationships",
        "results": relationships_results
    }), 200

@bp.route("/search-especific-relationship", methods=['POST'])
def specific_relationship():
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400
    
    relationship_id = data.get("id")

    relationship = search_model.search_especific(relationship_id, "personajes")

    if not relationship:
        return jsonify({
            "status": "error",
            "message": "Character was not found"
        }), 404
    
    relationship["personaje1"] = search_model.search_especific(str(relationship.get("personaje1", "")), "personajes")
    relationship["personaje2"] = search_model.search_especific(str(relationship.get("personaje2", "")), "personajes")
    relationship["type"] = "relationships"

    relationship["_id"] = str(relationship["_id"])
    return jsonify({
        "status": "successful",
        "message": "character was found successfuly",
        "type": "relationships",
        "results": relationship
    }), 200