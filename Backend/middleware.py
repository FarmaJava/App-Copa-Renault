import os
from functools import wraps
from flask import request, jsonify
import firebase_admin
from firebase_admin import auth, credentials

# Inicializa Firebase Admin SDK una sola vez
# Necesitás descargar el archivo serviceAccountKey.json desde
# Firebase Console → Configuración del proyecto → Cuentas de servicio
_cred_path = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(_cred_path)
    firebase_admin.initialize_app(cred)


def verificar_token(f):
    """
    Decorador que verifica el token JWT de Firebase en el header Authorization.
    Si es válido, inyecta 'uid' y 'email' en los kwargs de la función.

    Uso:
        @app.route("/ruta-protegida")
        @verificar_token
        def mi_ruta(uid, email):
            ...
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Token no proporcionado"}), 401

        token = auth_header.replace("Bearer ", "").strip()
        try:
            decoded = auth.verify_id_token(token)
            kwargs["uid"]   = decoded["uid"]
            kwargs["email"] = decoded.get("email", "")
        except Exception:
            return jsonify({"error": "Token inválido o expirado"}), 401

        return f(*args, **kwargs)
    return decorated


def solo_admin(f):
    """
    Decorador que además de verificar el token,
    solo permite acceso al email admin@itr.com
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Token no proporcionado"}), 401

        token = auth_header.replace("Bearer ", "").strip()
        try:
            decoded = auth.verify_id_token(token)
            email = decoded.get("email", "")
            if email != "admin@itr.com":
                return jsonify({"error": "Acceso denegado: no sos admin"}), 403
            kwargs["uid"]   = decoded["uid"]
            kwargs["email"] = email
        except Exception:
            return jsonify({"error": "Token inválido o expirado"}), 401

        return f(*args, **kwargs)
    return decorated
