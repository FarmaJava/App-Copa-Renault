from flask import Blueprint, jsonify, request
from db import query, execute
from middleware import verificar_token

auth_bp = Blueprint("auth", __name__)


# ── POST /api/auth/registro ──────────────────────────────────────────────────
# Reemplaza: CreateUsuario mutation
# Se llama desde el front DESPUÉS de que Firebase Auth crea el usuario
@auth_bp.route("/registro", methods=["POST"])
@verificar_token
def registrar_usuario(uid, email):
    """
    Guarda el usuario en PostgreSQL luego de que Firebase Auth lo crea.
    Body JSON: { nombre }
    El email se toma del token verificado (más seguro que recibirlo del body).
    """
    data = request.get_json()
    nombre = data.get("nombre", "").strip()

    if not nombre:
        return jsonify({"error": "El nombre es obligatorio"}), 400

    # Verificar si ya existe (por si el front llama dos veces)
    existente = query("SELECT id FROM usuario WHERE email = %s", (email,))
    if existente:
        return jsonify({"mensaje": "Usuario ya registrado", "id": str(existente[0]["id"])}), 200

    resultado = execute("""
        INSERT INTO usuario (nombre, email, tipo_usuario)
        VALUES (%s, %s, 'usuario')
        RETURNING id
    """, (nombre, email))

    return jsonify({"mensaje": "Usuario creado", "id": str(resultado[0]["id"])}), 201


# ── GET /api/auth/me ─────────────────────────────────────────────────────────
# Devuelve el perfil del usuario logueado desde PostgreSQL
@auth_bp.route("/me", methods=["GET"])
@verificar_token
def get_perfil(uid, email):
    """Retorna los datos del usuario autenticado."""
    filas = query("""
        SELECT id, nombre, email, tipo_usuario, estado, fecha_registro
        FROM usuario
        WHERE email = %s
    """, (email,))

    if not filas:
        return jsonify({"error": "Usuario no encontrado en la base de datos"}), 404

    u = filas[0]
    return jsonify({
        "id":           str(u["id"]),
        "nombre":       u["nombre"],
        "email":        u["email"],
        "tipoUsuario":  u["tipo_usuario"],
        "estado":       u["estado"],
        "fechaRegistro": str(u["fecha_registro"]),
    })
