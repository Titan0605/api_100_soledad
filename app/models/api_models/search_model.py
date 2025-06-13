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
        try:
            results = db.find(
            {"$text": {"$search": query}},
            {"score": {"$meta": "textScore"}}
            ).sort([("score", {"$meta": "textScore"})]).limit(10)
        except:
            return []

        return results
    
    def search_especific(self, id, collection_name):
        db = self.getCollection(collection_name)
        try:
            oid = ObjectId(id)
        except Exception:
            return None
        information = db.find_one({"_id": oid})
        return information
    
    def update(self, id, collection_name, dictionary: dict):
        db = self.getCollection(collection_name)
        try:
            oid = ObjectId(id)
            db.update_one(
                {"_id": oid},
                {"$set": dictionary}
            )
            return True
        except Exception as e:
            print(f"Error updating: {e}")
            return False
        
    def get_essential(self, collection_name):
        db = self.getCollection(collection_name)
        try:
            results = db.find(
                {}, # Empty filter to obtain all data
                {"nombre": 1} # We only want the name with the _id
            )
            return results
        except Exception as e:
            print(f"Error obtaining data: {e}")
            return f"Error obtaining data: {e}"

    def insert_document(self, collection_name: str, data: dict) -> tuple[bool, str]:
        """Insert a new document into the specified collection
        
        Args:
            collection_name: Name of the MongoDB collection
            data: Dictionary containing the document data
            
        Returns:
            Tuple of (success: bool, inserted_id: str)
        """
        db = self.getCollection(collection_name)
        try:
            # Add creation timestamp
            data['fecha_creacion'] = datetime.now(timezone.utc)
            
            # Insert the document
            result = db.insert_one(data)
            
            # Return success and the new document's ID
            return True, str(result.inserted_id)
        except Exception as e:
            print(f"Error inserting document: {e}")
            return False, str(e)