from flask import Blueprint, jsonify, request
from db import query, execute
from middleware import verificar_token, solo_admin

cantina_bp = Blueprint("cantina", __name__)


# ── GET /api/cantina/productos ──────────────────────────────────────────────
# Reemplaza: listProductosCantinaDisponibles()
@cantina_bp.route("/productos", methods=["GET"])
def get_productos():
    """
    Devuelve todos los productos de cantina disponibles.
    Público - no requiere token.
    """
    filas = query("""
        SELECT id, nombre, descripcion, precio, categoria, imagen_url
        FROM producto_cantina
        WHERE disponible = TRUE
        ORDER BY categoria, nombre
    """)
    # Convertir UUID a string para que JSON los serialice bien
    productos = [serializar(p) for p in filas]
    return jsonify({"productoCantinas": productos})


# ── GET /api/cantina/productos/todos ────────────────────────────────────────
# Reemplaza: listProductosCantina() - versión admin con todos los productos
@cantina_bp.route("/productos/todos", methods=["GET"])
@solo_admin
def get_todos_productos(uid, email):
    """Solo admin puede ver productos no disponibles también."""
    filas = query("""
        SELECT id, nombre, descripcion, precio, categoria,
               disponible, imagen_url, fecha_creacion
        FROM producto_cantina
        ORDER BY categoria, nombre
    """)
    return jsonify({"productoCantinas": [serializar(p) for p in filas]})


# ── POST /api/cantina/productos ─────────────────────────────────────────────
# Reemplaza: createProductoCantina()
@cantina_bp.route("/productos", methods=["POST"])
@solo_admin
def crear_producto(uid, email):
    """
    Crea un nuevo producto en la cantina.
    Body JSON: { nombre, descripcion, precio, categoria, imagenUrl }
    """
    data = request.get_json()

    # Validación mínima
    if not data.get("nombre") or data.get("precio") is None:
        return jsonify({"error": "nombre y precio son obligatorios"}), 400

    resultado = execute("""
        INSERT INTO producto_cantina (nombre, descripcion, precio, categoria, imagen_url)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, nombre, precio
    """, (
        data["nombre"],
        data.get("descripcion"),
        float(data["precio"]),
        data.get("categoria"),
        data.get("imagenUrl"),
    ))

    return jsonify({"producto": serializar(resultado[0]) if resultado else {}}), 201


# ── PUT /api/cantina/productos/<id> ─────────────────────────────────────────
# Reemplaza: updateProductoCantina()
@cantina_bp.route("/productos/<producto_id>", methods=["PUT"])
@solo_admin
def actualizar_producto(producto_id, uid, email):
    """
    Actualiza un producto existente.
    Body JSON: { nombre, descripcion, precio, categoria, imagenUrl, disponible }
    """
    data = request.get_json()

    if not data.get("nombre") or data.get("precio") is None:
        return jsonify({"error": "nombre y precio son obligatorios"}), 400

    execute("""
        UPDATE producto_cantina
        SET nombre      = %s,
            descripcion = %s,
            precio      = %s,
            categoria   = %s,
            imagen_url  = %s,
            disponible  = %s
        WHERE id = %s
    """, (
        data["nombre"],
        data.get("descripcion"),
        float(data["precio"]),
        data.get("categoria"),
        data.get("imagenUrl"),
        data.get("disponible", True),
        producto_id,
    ))

    return jsonify({"ok": True})


# ── DELETE /api/cantina/productos/<id> ──────────────────────────────────────
# Reemplaza: deleteProductoCantina()
@cantina_bp.route("/productos/<producto_id>", methods=["DELETE"])
@solo_admin
def eliminar_producto(producto_id, uid, email):
    """Elimina un producto de la cantina."""
    execute("DELETE FROM producto_cantina WHERE id = %s", (producto_id,))
    return jsonify({"ok": True})


# ── Helper ───────────────────────────────────────────────────────────────────
def serializar(row):
    """Convierte UUIDs y fechas a string para que jsonify no falle."""
    result = {}
    for k, v in row.items():
        # Pasar camelCase al frontend (imagenUrl en vez de imagen_url)
        key = snake_to_camel(k)
        result[key] = str(v) if hasattr(v, "hex") else v
    return result

def snake_to_camel(s):
    partes = s.split("_")
    return partes[0] + "".join(p.capitalize() for p in partes[1:])
