from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_symbols", __name__)
search_model = SearchingModel()

@bp.route("/symbols-search", methods=['POST'])
def search_symbols():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"status": "error", "message": "You must send something a 'query' field in JSON"}), 400
    
    user_query = data.get('query', '')
    symbols_cursor = search_model.search_general(user_query, "simbolos_temas")

    if not symbols_cursor:
        return jsonify({
            "status": "error",
            "message": "No symbol was found"
        }), 404

    symbols_results = []
    for doc in symbols_cursor:
        doc["eventos_relacionados"] = iterate_arrays_api(doc.get("eventos_relacionados", []), "eventos")
        doc["personajes_afectados"] = iterate_arrays_api(doc.get("personajes_afectados", []), "personajes")
        doc["type"] = "symbols"
        doc["_id"] = str(doc["_id"])
        symbols_results.append(doc)
    
    return jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "symbols",
        "results": symbols_results
    }), 200

@bp.route("/search-specific-symbols/<id>", methods=["GET"])
def specific_symbol(id):
    symbol_id = id
    if not symbol_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

    symbol = search_model.search_especific(symbol_id, "simbolos_temas")

    if not symbol:
        return jsonify({
            "status": "error",
            "message": "Symbol was not found"
        }), 404

    symbol["eventos_relacionados"] = iterate_arrays_api(symbol.get("eventos_relacionados", []), "eventos")
    symbol["personajes_afectados"] = iterate_arrays_api(symbol.get("personajes_afectados", []), "personajes")
    symbol["type"] = "symbols"
    symbol["_id"] = str(symbol["_id"])


    return jsonify({
        "status": "successful",
        "message": "Symbol was found successfuly",
        "type": "symbols",
        "results": symbol
    }), 200

@bp.route("/insert/symbols", methods=['POST'])
def create_symbol():
    data = request.get_json()
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent"
        }), 400

    # Validate required fields
    required_fields = ['nombre', 'tipo', 'capitulos_aparicion', 'interpretaciones', 'elementos_asociados']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "status": "error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    # Insert the symbol
    success, inserted_id = search_model.insert_document("simbolos_temas", data)

    if success:
        return jsonify({
            "status": "successful",
            "message": "Symbol created successfully",
            "_id": inserted_id
        }), 201
    else:
        return jsonify({
            "status": "error",
            "message": f"Error creating symbol: {inserted_id}"
        }), 500

def update_symbols(id, dictionary):
    return search_model.update(id, "simbolos_temas", dictionary)