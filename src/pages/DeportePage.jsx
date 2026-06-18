import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  listPartidosPorDeporte,
  listDivisionesPorDeporte,
  listEquiposPorDivision,
  listJugadoresPorEquipo,
} from "../dataconnect-generated/esm/index.esm.js";
import "./DeportePage.css";

// ─── Mapa de UUID → nombre del deporte ───────────────────────────────────────
const DEPORTES = {
  "44edf1eb-e95c-40c8-9a42-e4655707d439": "Fútbol",
  "77d08f9b-9244-4584-bad9-f91b0ed4f36c": "Básquet",
  "a87f074f-a29d-49dc-a13d-64dd4ff78908": "Vóley",
};

// ─── Badge de estado ──────────────────────────────────────────────────────────
function EstadoBadge({ estado }) {
  const colores = {
    programado: "badge-programado",
    "en curso": "badge-encurso",
    finalizado: "badge-finalizado",
  };
  return (
    <span className={`estado-badge ${colores[estado] || ""}`}>{estado}</span>
  );
}

// ─── Card de partido ──────────────────────────────────────────────────────────
function PartidoCard({ partido }) {
  return (
    <div className="partido-card">
      <div className="partido-meta">
        <span className="partido-hora">{partido.horaPartido}</span>
        <span className="partido-cancha">{partido.ubicacion}</span>
        <span className="partido-categoria">
          {partido.division?.nivel} — {partido.division?.nombre}
        </span>
        <EstadoBadge estado={partido.estado} />
      </div>
      <div className="partido-detalles">
        <span className="partido-equipo">{partido.equipoLocal?.nombre}</span>
        <span className="partido-puntos-local">
          {partido.estado === "programado" ? "-" : partido.resultadoLocal}
        </span>
        <span className="partido-guion">vs</span>
        <span className="partido-puntos-visitante">
          {partido.estado === "programado" ? "-" : partido.resultadoVisitante}
        </span>
        <span className="partido-equipo">{partido.equipoVisitante?.nombre}</span>
      </div>
      {partido.arbitro && (
        <div className="partido-arbitro">
          🧑‍⚖️ Árbitro: {partido.arbitro.nombre}
        </div>
      )}
    </div>
  );
}

// ─── Card de equipo con jugadores expandibles ─────────────────────────────────
function EquipoCard({ equipo }) {
  const [abierto, setAbierto] = useState(false);
  const [jugadores, setJugadores] = useState([]);
  const [cargando, setCargando] = useState(false);

  async function cargarJugadores() {
    if (jugadores.length > 0) { setAbierto((v) => !v); return; }
    setCargando(true);
    try {
      const res = await listJugadoresPorEquipo({ equipoId: equipo.id });
      setJugadores(res.data?.jugadors || []);
    } catch (e) {
      console.error("Error cargando jugadores:", e);
    } finally {
      setCargando(false);
      setAbierto(true);
    }
  }

  return (
    <div className="equipo-card">
      <div className="equipo-header" onClick={cargarJugadores}>
        <span className="equipo-nombre">{equipo.nombre}</span>
        <span className="equipo-ciudad">{equipo.ciudad}</span>
        <span className="equipo-toggle">{abierto ? "▲" : "▼"}</span>
      </div>

      {abierto && (
        <div className="equipo-jugadores">
          {cargando && <p className="cargando-texto">Cargando jugadores...</p>}
          {!cargando && jugadores.length === 0 && (
            <p className="sin-datos">Sin jugadores registrados</p>
          )}
          {jugadores
            .sort((a, b) => a.numeroCamiseta - b.numeroCamiseta)
            .map((j) => (
              <div key={j.id} className="jugador-fila">
                <span className="jugador-numero">#{j.numeroCamiseta}</span>
                <span className="jugador-nombre">{j.nombre}</span>
                <span className="jugador-posicion">{j.posicion}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
function DeportePage() {
  const { id } = useParams(); // UUID del deporte
  const navigate = useNavigate();
  const { admin } = useAuth();

  const deporteNombre = DEPORTES[id] || "Deporte";

  const [partidos, setPartidos] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [equiposPorDivision, setEquiposPorDivision] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Filtro por división seleccionada
  const [divisionActiva, setDivisionActiva] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      setError(null);
      try {
        const [resPartidos, resDivisiones] = await Promise.all([
          listPartidosPorDeporte({ deporteId: id }),
          listDivisionesPorDeporte({ deporteId: id }),
        ]);

        const divs = resDivisiones.data?.divisions || [];
        setPartidos(resPartidos.data?.partidos || []);
        setDivisiones(divs);

        // Cargá equipos de todas las divisiones en paralelo
        const equiposEntries = await Promise.all(
          divs.map(async (div) => {
            const res = await listEquiposPorDivision({ divisionId: div.id });
            return [div.id, res.data?.equipos || []];
          })
        );
        setEquiposPorDivision(Object.fromEntries(equiposEntries));

      } catch (e) {
        console.error("Error cargando datos:", e);
        setError("No se pudieron cargar los datos. Revisá la conexión.");
      } finally {
        setCargando(false);
      }
    }

    if (id) cargarDatos();
  }, [id]);

  // Partidos filtrados por división activa
  const partidosFiltrados = divisionActiva
    ? partidos.filter((p) => p.division?.id === divisionActiva)
    : partidos;

  return (
    <div className={"deporte-page" + (admin ? " admin-mode" : "")}>
      {admin && <div className="admin-badge">Admin</div>}
      <div className="banner-accent" />

      <button className="volver-btn" onClick={() => navigate("/deportes")}>
        ← Volver
      </button>

      <header className="deporte-banner">
        <p className="banner-ano">2026</p>
        <h1 className="deporte-titulo">{deporteNombre}</h1>
      </header>

      {cargando && (
        <div className="cargando-container">
          <p className="cargando-texto">⏳ Cargando datos...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-texto">❌ {error}</p>
        </div>
      )}

      {!cargando && !error && (
        <>
          {/* ── Filtros por división ── */}
          {divisiones.length > 0 && (
            <section className="divisiones-section">
              <h2 className="section-titulo">Divisiones</h2>
              <div className="divisiones-filtros">
                <button
                  className={"division-btn" + (!divisionActiva ? " activa" : "")}
                  onClick={() => setDivisionActiva(null)}
                >
                  Todas
                </button>
                {divisiones.map((div) => (
                  <button
                    key={div.id}
                    className={"division-btn" + (divisionActiva === div.id ? " activa" : "")}
                    onClick={() => setDivisionActiva(div.id)}
                  >
                    {div.nivel}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ── Partidos ── */}
          <section className="partidos-section">
            <h2 className="section-titulo">
              Partidos {divisionActiva && `— ${divisiones.find(d => d.id === divisionActiva)?.nivel}`}
            </h2>
            {partidosFiltrados.length === 0 ? (
              <p className="sin-datos">No hay partidos registrados</p>
            ) : (
              <div className="partidos-lista">
                {partidosFiltrados
                  .sort((a, b) => new Date(a.fechaPartido) - new Date(b.fechaPartido))
                  .map((p) => <PartidoCard key={p.id} partido={p} />)}
              </div>
            )}
          </section>

          {/* ── Equipos y jugadores ── */}
          <section className="equipos-section">
            <h2 className="section-titulo">Equipos</h2>
            {divisiones
              .filter((div) => !divisionActiva || div.id === divisionActiva)
              .map((div) => (
                <div key={div.id} className="division-grupo">
                  <h3 className="division-subtitulo">{div.nivel} — {div.nombre}</h3>
                  {(equiposPorDivision[div.id] || []).length === 0 ? (
                    <p className="sin-datos">Sin equipos</p>
                  ) : (
                    (equiposPorDivision[div.id] || []).map((eq) => (
                      <EquipoCard key={eq.id} equipo={eq} />
                    ))
                  )}
                </div>
              ))}
          </section>
        </>
      )}

      <section className="favoritos-section">
        <button
          className="favoritos-btn"
          onClick={() => navigate("/deporte/" + id + "/favoritos")}
        >
          ⭐ Ver favoritos
        </button>
      </section>

      <footer className="deportes-footer">
        <p>© 2026 Copa Renault · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default DeportePage;