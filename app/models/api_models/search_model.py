from app.utils.db_utils import get_client, get_collection
from datetime import datetime, timezone
from pymongo import MongoClient
from pymongo.collection import Collection
from typing import Optional, Dict, Any
import re
from bson import ObjectId

class SearchingModel:
    def __init__(self) -> None:
        self._client: Optional[MongoClient] = None
        self._users_collection: Optional[Collection] = None
        
    @property
    def client(self) -> MongoClient:
        if self._client is None:
            self._client = get_client()
        return self._client
    
    @property
    def collection(self) -> Collection:
        self._users_collection = get_collection("")
        return self._users_collection
    
    def getCollection(self, collection) -> Collection:
        self._users_collection = get_collection(collection)
        return self._users_collection

    def search_general(self, query, collection_name):
        db = self.getCollection(collection_name)

        results = db.find(
        {"$text": {"$search": query}},
        {"score": {"$meta": "textScore"}}
        ).sort([("score", {"$meta": "textScore"})]).limit(10)

        return results
    
    def search_especific(self, id, collection_name):
        db = self.getCollection(collection_name)
        # Convierte la cadena a ObjectId antes de buscar
        try:
            oid = ObjectId(id)
        except Exception:
            return None
        information = db.find_one({"_id": oid})
        return information