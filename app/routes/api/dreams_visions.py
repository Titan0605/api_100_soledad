from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api
from bson import ObjectId

bp = Blueprint("api_dreams_visions", __name__)
search_model = SearchingModel()

@bp.route("/dreams-visions-search", methods=['POST'])
def dreams_visions_search():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({
            "status": "error",
            "message": "missing data or query field"
            }), 400
    
    user_query = data.get("query", "")

    dreams_visions_cursor = search_model.search_general(user_query, "suenos_visiones")
    if not dreams_visions_cursor:
        return jsonify({
            "status": "error",
            "message": "No object was found"
        }, 404)
    
    dreams_visions_results = []
    for doc in dreams_visions_cursor:
        doc["soñador"] = search_model.search_especific(doc.get("soñador", ""), "personajes")
        doc["type"] = "dreams_visions"
        doc["_id"] = str(doc["_id"])
        dreams_visions_results.append(doc)

    return  jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "dreams_visions",
        "results": dreams_visions_results
    }), 200

@bp.route("/search-specific-dreams_visions/<id>", methods=["GET"])
def specific_object(id):
    dream_vision_id = id
    if not dream_vision_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

    dream_vision = search_model.search_especific(dream_vision_id, "suenos_visiones")

    if not dream_vision:
        return jsonify({
            "status": "error",
            "message": "vision or dream was not found"
        }), 404
    
    dream_vision["soñador"] = search_model.search_especific(dream_vision.get("soñador", ""), "personajes")
    dream_vision["type"] = "dreams_visions"
    dream_vision["_id"] = str(dream_vision["_id"])

    return jsonify({
        "status": "successful",
        "message": "the object was found successfuly",
        "type": "dreams-visions",
        "results": dream_vision
    }), 200

@bp.route("/insert/dreams", methods=['POST'])
def create_dream():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['soñador', 'tipo', 'capitulo', 'descripcion', 'interpretacion']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Convert ID to ObjectId
    if 'soñador' in data:
        if isinstance(data['soñador'], list):
            data['soñador'] = [ObjectId(id) for id in data['soñador']]
        else:
            data['soñador'] = ObjectId(data['soñador'])

    # Insert the dream/vision
    success, inserted_id = search_model.insert_document("suenos_visiones", data)

    if success:
        return jsonify({
            "status": "successful",
            "message": "Dream/vision created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error", 
            "message": f"Error creating dream/vision: {inserted_id}"
        }), 500

def update_dreams_visions(id, dictionary):
    return search_model.update(id, "sueños_visiones", dictionary)