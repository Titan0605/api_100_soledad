from app.models import SearchingModel
search_model = SearchingModel()

def iterate_arrays_api(array, collection_name):
    results = []
    for id in array:
        try:
            char = search_model.search_especific(str(id), collection_name)
            if char:
                char["_id"] = str(char["_id"])
                results.append(char)
        except Exception as e:
            print(f"Error iterating: {e}")

    return results