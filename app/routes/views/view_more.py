from flask import Blueprint, render_template, request

bp = Blueprint("view_more", __name__)

@bp.route("/view/<id>/<type>", methods=['GET'])
def view(id, type):
    doc_id = id
    doc_type = type
    
    print('La DATAAA: ', doc_id, doc_type)
    return render_template("view_more.html")