from flask import Blueprint, render_template

bp = Blueprint("view_more", __name__)

@bp.route("/view")
def view():
    return render_template("view_more.html")