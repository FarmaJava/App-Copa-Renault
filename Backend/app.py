from flask import Flask
from flask_cors import CORS
from routes.cantina import cantina_bp
from routes.deportes import deportes_bp
from routes.sponsors import sponsors_bp
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:5174"])

app.register_blueprint(cantina_bp,   url_prefix="/api/cantina")
app.register_blueprint(deportes_bp,  url_prefix="/api/deportes")
app.register_blueprint(sponsors_bp,  url_prefix="/api/sponsors")
app.register_blueprint(auth_bp,      url_prefix="/api/auth")

if __name__ == "__main__":
    app.run(debug=True, port=5000, use_reloader=False)
