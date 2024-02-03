from flask import Flask
# from .db import init_db
from .routes import register_routes

def create_app():
    app = Flask(__name__)
    
    try:
        app.config.from_pyfile('../config.py')
    except Exception as e:
        print("Error initializing app:", e)

    register_routes(app)

    return app
