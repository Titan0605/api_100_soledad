from flask import Blueprint, request, jsonify
from app.models import SearchingModel
from app.utils import iterate_arrays_api

bp = Blueprint("api_chapters", __name__)
search_model = SearchingModel()

@bp.route("/chapters-search", methods=['POST'])
def search_chapters():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"status": "error", "message": "You must send something a 'query' field in JSON"}), 400
    
    user_query = data.get('query', '')
    chapters_cursor = search_model.search_general(user_query, "capitulos")

    if not chapters_cursor:
        return jsonify({
            "status": "error",
            "message": "No chapter was found"
        }), 404

    chapters_results = []
    for doc in chapters_cursor:
        doc["eventos_relacionados"] = iterate_arrays_api(doc.get("eventos_relacionados", []), "eventos")
        doc["type"] = "chapters"
        doc["_id"] = str(doc["_id"])
        chapters_results.append(doc)
    
    return jsonify({
        "status":  "successful",
        "message": "Request was successful",
        "type":    "chapters",
        "results": chapters_results
    }), 200

@bp.route("/search-specific-chapters/<id>", methods=["GET"])
def specific_chapter(id):
    chapter_id = id
    if not chapter_id:
        return jsonify({
            "status": "error",
            "message": "Not data sent or missing id field"
        }), 400

    chapter = search_model.search_especific(chapter_id, "capitulos")

    if not chapter:
        return jsonify({
            "status": "error",
            "message": "Chapter was not found"
        }), 404

    chapter["eventos_relacionados"] = iterate_arrays_api(chapter.get("eventos_relacionados", []), "eventos")
    chapter["type"] = "chapters"
    chapter["_id"] = str(chapter["_id"])


    return jsonify({
        "status": "successful",
        "message": "Symbol was found successfuly",
        "type": "chapters",
        "results": chapter
    }), 200

def update_chapters(id, dictionary):
    return search_model.update(id, "capitulos", dictionary)