from flask import Blueprint, request, jsonify
import requests

bp = Blueprint("api_search", __name__)

@bp.route("/general-search")
def general_search():
    topics = ["chapters", "characters", "dreams_visions", "events", "locations", "objects", "relationships", "symbols"]

    data = request.get_json()
    if not data or "query" not in data or "filters" not in data:
        return jsonify({"status": "error", "message": "You must send something a 'query' or 'filters' field in JSON"}), 400
    
    user_query = data.get('query', 'Remedios la bella')
    filters = data.get('filters', [])

    payload = {
        "query": user_query
    }
    results = []
    if filters:
        for filter in filters:
            response = requests.get(f"/{filter}-search", json=payload)
            if response.status_code == 200:
                result = response.json()
                results.extend(result.get("results", []))
            else:
                print(f"Something went wrong in the filter {filter}")
                print("response: ", response.json())
    else:
        for topic in topics:
            response = requests.get(f"/{topic}-search", json=payload)
            if response.status_code == 200:
                result = response.json()
                results.extend(result.get("results", []))
            else:
                print(f"Something went wrong in the filter {topic}")
                print("response: ", response.json())

    if not results:
        return jsonify({
            "status": "error",
            "message": "Nothing was found"
        }), 404
    
    return jsonify({
        "status": "successful",
        "message": "Request was successful"
    }), 200