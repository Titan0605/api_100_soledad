from flask import Blueprint, render_template

bp = Blueprint("view_more", __name__)

@bp.route("/view/<id>/<type>")
def view():
    id = id
    id = type
    
    # response = 
    return render_template("view_more.html")