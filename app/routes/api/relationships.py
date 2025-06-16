from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api
from bson import ObjectId

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
        doc["personaje1"]["type"] = "characters"
        doc["personaje2"] = search_model.search_especific(str(doc.get("personaje2", "")), "personajes")
        doc["personaje2"]["type"] = "characters"
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
    relationship["personaje1"]["type"] = "characters"
    relationship["personaje2"] = search_model.search_especific(str(relationship.get("personaje2", "")), "personajes")
    relationship["personaje2"]["type"] = "characters"
    relationship["type"] = "relationships"

    relationship["_id"] = str(relationship["_id"])
    return jsonify({
        "status": "successful",
        "message": "Relationship was found successfuly",
        "type": "relationships",
        "results": relationship
    }), 200

def update_relationships(id, dictionary):
    if 'personaje1' in dictionary:
        dictionary['personaje1'] = ObjectId(dictionary['personaje1'])
    if 'personaje2' in dictionary:
        dictionary['personaje2'] = ObjectId(dictionary['personaje2'])
    
    return search_model.update(id, "parejas_relaciones", dictionary)

@bp.route("/insert/relationships", methods=['POST'])
def create_relationship():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['personaje1', 'personaje2', 'tipo_relacion', 'capitulo_inicio', 'descripcion']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Convert IDs to ObjectId
    if 'personaje1' in data:
        data['personaje1'] = ObjectId(data['personaje1'])
    if 'personaje2' in data:
        data['personaje2'] = ObjectId(data['personaje2'])

    # Insert the relationship
    success, inserted_id = search_model.insert_document("parejas_relaciones", data)

    if success:
        return jsonify({
            "status": "successful",
            "message": "Relationship created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error",
            "message": f"Error creating relationship: {inserted_id}"
        }), 500