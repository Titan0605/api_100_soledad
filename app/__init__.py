from flask import Flask
from dotenv import load_dotenv
from app.database.db_init import init_db
from app.utils.db_utils import utils_save_db
from app.routes.views import index_view
from app.routes.api import chapters, characters, dreams_visions, symbols, relationships, events, locations, objects

def create_app() -> Flask:
    load_dotenv()
    
    app = Flask(__name__)
    
    mongo_client = init_db(app)
    utils_save_db(mongo_client)
    
    app.register_blueprint(index_view.bp)
    app.register_blueprint(chapters.bp)
    app.register_blueprint(characters.bp)
    app.register_blueprint(dreams_visions.bp)
    app.register_blueprint(symbols.bp)
    app.register_blueprint(relationships.bp)
    app.register_blueprint(events.bp)
    app.register_blueprint(locations.bp)
    app.register_blueprint(objects.bp)
    
    return app