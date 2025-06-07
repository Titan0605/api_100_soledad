from flask import Flask
from dotenv import load_dotenv
from app.database.db_init import init_db
from app.utils.db_utils import utils_save_db
from app.routes.views import index_view

def create_app() -> Flask:
    load_dotenv()
    
    app = Flask(__name__)
    
    mongo_client = init_db(app)
    utils_save_db(mongo_client)
    
    app.register_blueprint(index_view.bp)
    
    return app