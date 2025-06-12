from flask import Blueprint, render_template
import requests

bp = Blueprint("view_more", __name__)

@bp.route("/view/<id>/<type>", methods=['GET'])
def view(id, type):
    doc_id = id
    doc_type = type
    
    data = collect_type(doc_id, doc_type)
    print(data)
    return render_template("view_more.html", data=data)

def collect_type(doc_id, doc_type):
    match doc_type:
        case 'chapters':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-chapters/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'characters':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-characters/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'dreams_visions':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-dreams_visions/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'events':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-events/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'locations':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-locations/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'objects':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-objects/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'relationships':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-relationships/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results
        case 'symbols':
            response = requests.get(f'http://127.0.0.1:3000/search-specific-symbols/{doc_id}')            
            if response.status_code == 200:
                data = response.json()
                results = data.get('results')  
                return results