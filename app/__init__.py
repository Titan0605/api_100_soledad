from flask import Flask
from dotenv import load_dotenv
from app.database.db_init import init_db
from app.routes.views import index_view

def create_app() -> Flask:
    load_dotenv()
    
    app = Flask(__name__)
    
    mongo_client = init_db(app)
    
    app.register_blueprint(index_view.bp)
    
    
    return app