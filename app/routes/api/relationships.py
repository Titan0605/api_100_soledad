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

    relationships_cursor = search_model.search_general(user_query, "parejas_relaciones")

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

@bp.route("/search-specific-relationships/<id>", methods=['GET'])
def specific_relationship(id):
    relationship_id = id
    if not relationship_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

    relationship = search_model.search_especific(relationship_id, "parejas_relaciones")

    if not relationship:
        return jsonify({
            "status": "error",
            "message": "Relationship was not found"
        }), 404
    
    relationship["personaje1"] = search_model.search_especific(str(relationship.get("personaje1", "")), "personajes")
    relationship["personaje2"] = search_model.search_especific(str(relationship.get("personaje2", "")), "personajes")
    relationship["type"] = "relationships"

    relationship["_id"] = str(relationship["_id"])
    return jsonify({
        "status": "successful",
        "message": "Relationship was found successfuly",
        "type": "relationships",
        "results": relationship
    }), 200

def update_relationships(id, dictionary):
    return search_model.update(id, "parejas_relaciones", dictionary)