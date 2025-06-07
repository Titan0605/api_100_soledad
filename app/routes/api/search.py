from flask import Blueprint, request, jsonify, current_app
from app.routes.api.chapters       import search_chapters
from app.routes.api.characters     import search_characters
from app.routes.api.dreams_visions import dreams_visions_search
from app.routes.api.events         import search_events
from app.routes.api.locations      import locations_search
from app.routes.api.objects        import objects_search
from app.routes.api.relationships  import search_relationships
from app.routes.api.symbols        import search_symbols

bp = Blueprint("api_search", __name__)

TOPIC_FUNCS = {
    "chapters":       search_chapters,
    "characters":     search_characters,
    "dreams_visions": dreams_visions_search,
    "events":         search_events,
    "locations":      locations_search,
    "objects":        objects_search,
    "relationships":  search_relationships,
    "symbols":        search_symbols,
}

@bp.route("/general-search", methods=["GET"])
def general_search():
    data = request.get_json(force=True)
    user_query = data.get("query", "").strip()
    filters    = data.get("filters", [])

    if not user_query:
        return jsonify({"status":"error","message":"the field 'query' is obligatory"}), 400
    if not isinstance(filters, list):
        return jsonify({"status":"error","message":"the filters must be an array"}), 400

    selected = filters or list(TOPIC_FUNCS.keys())
    invalid = [f for f in selected if f not in TOPIC_FUNCS]
    if invalid:
        return jsonify({"status":"error","message":f"Filter unknown : {invalid}"}), 400

    results = []
    for key in selected:
        try:
            # recreamos el cuerpo JSON para cada llamada
            with current_app.test_request_context(
                path=f"/{key}-search",
                method="GET",
                json={"query": user_query}
            ):
                resp = TOPIC_FUNCS[key]()            # invoca la ruta directamente
                if resp[1] == 200:
                    part = resp[0].get_json()
                    results.extend(part.get("results", []))
        except Exception as e:
            current_app.logger.error(f"Error searching {key}: {e}")
            continue

    if not results:
        return jsonify({"status":"error","message":"Nothing was found"}), 404

    return jsonify({
        "status":  "successful",
        "message": "Search successful",
        "results": results
    }), 200
