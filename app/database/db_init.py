from pymongo import MongoClient

def init_db(app) -> MongoClient:
    URI = "TEST"
    
    db_client = MongoClient(URI)
    
    app.config['MONGO_CLIENT'] = db_client
    
    return db_client