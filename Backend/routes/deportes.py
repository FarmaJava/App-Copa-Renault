from flask import Blueprint, jsonify
from db import query
from middleware import verificar_token

deportes_bp = Blueprint("deportes", __name__)


# ── GET /api/deportes/<deporte_id>/partidos ─────────────────────────────────
# Reemplaza: listPartidosPorDeporte({ deporteId })
@deportes_bp.route("/<deporte_id>/partidos", methods=["GET"])
def get_partidos(deporte_id):
    """
    Devuelve todos los partidos de un deporte dado.
    Incluye equipos, árbitro y división (igual que el query original).
    Público - no requiere token.
    """
    filas = query("""
        SELECT
            p.id,
            p.fecha_partido,
            p.hora_partido,
            p.ubicacion,
            p.estado,
            p.resultado_local,
            p.resultado_visitante,
            el.id   AS equipo_local_id,
            el.nombre AS equipo_local_nombre,
            ev.id   AS equipo_visitante_id,
            ev.nombre AS equipo_visitante_nombre,
            a.id    AS arbitro_id,
            a.nombre AS arbitro_nombre,
            d.id    AS division_id,
            d.nombre AS division_nombre,
            d.nivel  AS division_nivel
        FROM partido p
        JOIN equipo    el ON el.id = p.equipo_local_id
        JOIN equipo    ev ON ev.id = p.equipo_visitante_id
        JOIN arbitro   a  ON a.id  = p.arbitro_id
        JOIN division  d  ON d.id  = p.division_id
        WHERE d.deporte_id = %s
        ORDER BY p.fecha_partido, p.hora_partido
    """, (deporte_id,))

    partidos = []
    for r in filas:
        partidos.append({
            "id":               str(r["id"]),
            "fechaPartido":     str(r["fecha_partido"]),
            "horaPartido":      r["hora_partido"],
            "ubicacion":        r["ubicacion"],
            "estado":           r["estado"],
            "resultadoLocal":   r["resultado_local"],
            "resultadoVisitante": r["resultado_visitante"],
            "equipoLocal":      {"id": str(r["equipo_local_id"]),      "nombre": r["equipo_local_nombre"]},
            "equipoVisitante":  {"id": str(r["equipo_visitante_id"]),  "nombre": r["equipo_visitante_nombre"]},
            "arbitro":          {"id": str(r["arbitro_id"]),           "nombre": r["arbitro_nombre"]},
            "division":         {"id": str(r["division_id"]),          "nombre": r["division_nombre"], "nivel": r["division_nivel"]},
        })

    return jsonify({"partidos": partidos})


# ── GET /api/deportes/<deporte_id>/divisiones ───────────────────────────────
# Reemplaza: listDivisionesPorDeporte({ deporteId })
@deportes_bp.route("/<deporte_id>/divisiones", methods=["GET"])
def get_divisiones(deporte_id):
    """Devuelve las divisiones de un deporte. Público."""
    filas = query("""
        SELECT id, nombre, nivel
        FROM division
        WHERE deporte_id = %s
        ORDER BY nivel, nombre
    """, (deporte_id,))

    divisiones = [{"id": str(r["id"]), "nombre": r["nombre"], "nivel": r["nivel"]} for r in filas]
    return jsonify({"divisions": divisiones})


# ── GET /api/deportes/divisiones/<division_id>/equipos ──────────────────────
# Reemplaza: listEquiposPorDivision({ divisionId })
@deportes_bp.route("/divisiones/<division_id>/equipos", methods=["GET"])
def get_equipos(division_id):
    """Devuelve equipos de una división. Público."""
    filas = query("""
        SELECT id, nombre, ciudad, logo_url
        FROM equipo
        WHERE division_id = %s
        ORDER BY nombre
    """, (division_id,))

    equipos = [
        {"id": str(r["id"]), "nombre": r["nombre"], "ciudad": r["ciudad"], "logoUrl": r["logo_url"]}
        for r in filas
    ]
    return jsonify({"equipos": equipos})


# ── GET /api/deportes/equipos/<equipo_id>/jugadores ─────────────────────────
# Reemplaza: listJugadoresPorEquipo({ equipoId })
@deportes_bp.route("/equipos/<equipo_id>/jugadores", methods=["GET"])
def get_jugadores(equipo_id):
    """Devuelve jugadores de un equipo ordenados por número. Público."""
    filas = query("""
        SELECT id, nombre, numero_camiseta, posicion, fecha_nacimiento, foto_url
        FROM jugador
        WHERE equipo_id = %s
        ORDER BY numero_camiseta
    """, (equipo_id,))

    jugadores = [
        {
            "id":              str(r["id"]),
            "nombre":          r["nombre"],
            "numeroCamiseta":  r["numero_camiseta"],
            "posicion":        r["posicion"],
            "fechaNacimiento": str(r["fecha_nacimiento"]) if r["fecha_nacimiento"] else None,
            "fotoUrl":         r["foto_url"],
        }
        for r in filas
    ]
    return jsonify({"jugadors": jugadores})
