from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api
from bson.objectid import ObjectId

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
    print("si entro aquí a OBJETOS y el query es: ", user_query)
    objects_cursor = search_model.search_general(user_query, "objetos")
    if not objects_cursor:
        return jsonify({
            "status": "error",
            "message": "No object was found"
        }), 404
    
    print("paso de la validación de que no encontró en OBJETOS")

    objects_results = []
    for doc in objects_cursor:
        print("ESTE PUEDE SER EL ERROR: ", doc.get("propietarios", []))
        doc["propietarios"] = iterate_arrays_api(doc.get("propietarios", []), "personajes")
        doc["type"] = "objects"
        doc["_id"] = str(doc["_id"])
        objects_results.append(doc)

    print("paso del FOR en OBJETOS")

    return  jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "objects",
        "results": objects_results
    }), 200

@bp.route("/search-specific-objects/<id>", methods=["GET"])
def specific_object(id):
    object_id = id
    if not object_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

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

@bp.route("/insert/objects", methods=['POST'])
def create_object():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['nombre', 'tipo', 'descripcion', 'capitulos_aparicion']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Convert IDs to ObjectId
    if 'propietarios' in data:
        data['propietarios'] = [ObjectId(id) for id in data['propietarios']]

    # Insert the object
    success, inserted_id = search_model.insert_document("objetos", data)

    if success:
        return jsonify({
            "status": "successful",
            "message": "Object created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error",
            "message": f"Error creating object: {inserted_id}"
        }), 500

@bp.route("/objects-list", methods=["GET"])
def list_objects():
    objects_cursor = search_model.get_essential("objetos")
    if not objects_cursor or isinstance(objects_cursor, str):
        return jsonify({
            "status": "error",
            "message": "No objects found" if not objects_cursor else objects_cursor
        }), 404
    
    object_results = []
    for doc in objects_cursor:
        if isinstance(doc, dict) and '_id' in doc:
            object_results.append({
                "id": str(doc['_id']),
                "nombre": doc.get('nombre', '')
            })
    
    return jsonify({
        "status": "successful",
        "message": "Objects retrieved successfully",
        "results": object_results
    }), 200

def update_objects(id, dictionary):
    if 'propietarios' in dictionary:
        dictionary['propietarios'] = [ObjectId(id) for id in dictionary['propietarios']]
    
    return search_model.update(id, "objetos", dictionary)