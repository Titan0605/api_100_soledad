from flask import Flask
from app import create_app
from bson import ObjectId
from flask.json.provider import DefaultJSONProvider

class CustomJSONProvider(DefaultJSONProvider):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

app: Flask = create_app()
app.json = CustomJSONProvider(app)

if __name__ == "__main__":
    app.run(port=3000, debug=True)