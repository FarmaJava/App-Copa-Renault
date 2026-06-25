from flask import Blueprint, jsonify
from db import query

sponsors_bp = Blueprint("sponsors", __name__)


# ── GET /api/sponsors ────────────────────────────────────────────────────────
# Reemplaza: listSponsors()
@sponsors_bp.route("/", methods=["GET"])
def get_sponsors():
    """
    Devuelve sponsors activos con logo, slogan y sitio web.
    Público - no requiere token.
    """
    filas = query("""
        SELECT id, nombre, logo_url, slogan, sitio_web
        FROM sponsor
        WHERE estado = TRUE
        ORDER BY nombre
    """)

    sponsors = [
        {
            "id":      str(r["id"]),
            "nombre":  r["nombre"],
            "logoUrl": r["logo_url"],
            "slogan":  r["slogan"],
            "sitioWeb": r["sitio_web"],
        }
        for r in filas
    ]
    return jsonify({"sponsors": sponsors})
