from flask import Blueprint, request, jsonify, current_app
from app.routes.api.chapters       import search_chapters, update_chapters
from app.routes.api.characters     import search_characters, update_characters
from app.routes.api.dreams_visions import dreams_visions_search, update_dreams_visions
from app.routes.api.events         import search_events, update_events
from app.routes.api.locations      import locations_search, update_locations
from app.routes.api.objects        import objects_search, update_objects
from app.routes.api.relationships  import search_relationships, update_relationships
from app.routes.api.symbols        import search_symbols, update_symbols

bp = Blueprint("api_general", __name__)

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

@bp.route("/general-search", methods=["POST"])
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
            with current_app.test_request_context(
                path=f"/{key}-search",
                method="GET",
                json={"query": user_query}
            ):
                resp = TOPIC_FUNCS[key]()          
                if resp[1] == 200:
                    part = resp[0].get_json()
                    results.extend(part.get("results", []))
        except Exception as e:
            current_app.logger.error(f"Error searching {key}: {e}")
            continue

    if not results:
        return jsonify({"status":"error","message":"Nothing was found"}), 404
    
    results.sort(key=lambda x: x["score"], reverse=True)

    return jsonify({
        "status":  "successful",
        "message": "Search successful",
        "results": results
    }), 200

TOPIC_FUNCS_UPDATE = {
    "chapters":       update_chapters,
    "characters":     update_characters,
    "dreams_visions": update_dreams_visions,
    "events":         update_events,
    "locations":      update_locations,
    "objects":        update_objects,
    "relationships":  update_relationships,
    "symbols":        update_symbols,
}

@bp.route("/general-update", methods=["PUT"])
def general_update():
    data = request.get_json(force=True)
    event_id   = data.get("id", "").strip()
    dictionary = data.get("dictionary")
    collection = data.get("collection", "").strip()

    if not event_id or not dictionary or not collection:
        return jsonify({"status":"error","message":"Fields 'id', 'dictionary' and 'collection' are required"}), 400
    if not isinstance(dictionary, dict):
        return jsonify({"status":"error","message":"the information must be sent as dictionary"}), 400
    if collection not in TOPIC_FUNCS_UPDATE:
        return jsonify({"status":"error","message":f"Unknown collection: {collection}"}), 400

    try:
        success = TOPIC_FUNCS_UPDATE[collection](event_id, dictionary)
    except Exception as e:
        current_app.logger.error(f"Update error for {collection}: {e}")
        success = False

    if success:
        return jsonify({"status":"successful","message":"the update went well"}), 200

    return jsonify({"status":"error","message":"something went wrong in the update"}), 400