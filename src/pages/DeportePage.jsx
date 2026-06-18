import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  listPartidosPorDeporte,
  listDivisionesPorDeporte,
  listEquiposPorDivision,
  listJugadoresPorEquipo,
} from "../dataconnect-generated/esm/index.esm.js";
import "./DeportePage.css";

const jugadoresCache = {};

const DEPORTES = {
  "44edf1eb-e95c-40c8-9a42-e4655707d439": "Fútbol",
  "77d08f9b-9244-4584-bad9-f91b0ed4f36c": "Básquet",
  "a87f074f-a29d-49dc-a13d-64dd4ff78908": "Vóley",
};

const NIVEL_ACCENT = {
  Menor:      "var(--accent)",
  Intermedia: "var(--secondary)",
  Mayor:      "#facc15",
};

function EstadoBadge({ estado }) {
  const estilos = {
    programado:  { background: "var(--accent-bg)", color: "var(--accent)" },
    "en curso":  { background: "rgba(250,204,21,0.15)", color: "#facc15" },
    finalizado:  { background: "var(--accent-bg)", color: "var(--text)", opacity: 0.6 },
  };
  const s = estilos[estado] || estilos.finalizado;
  return (
    <span style={{
      ...s, fontSize: 11, fontWeight: 600,
      padding: "2px 8px", borderRadius: 99,
      letterSpacing: "0.04em", textTransform: "uppercase"
    }}>{estado}</span>
  );
}

function PartidoCard({ partido }) {
  return (
    <div className="partido-card">
      <div className="partido-meta">
        <span className="partido-hora">{partido.horaPartido}</span>
        <span className="partido-cancha">{partido.ubicacion}</span>
        <span className="partido-categoria">{partido.division?.nivel}</span>
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
        <span className="partido-equipo" style={{ textAlign: "right" }}>
          {partido.equipoVisitante?.nombre}
        </span>
      </div>
      {partido.arbitro && (
        <div style={{ fontSize: 12, color: "var(--text)", opacity: 0.5, marginTop: 2 }}>
          Árbitro: {partido.arbitro.nombre}
        </div>
      )}
    </div>
  );
}

function EquipoCard({ equipo, accent }) {
  const [abierto, setAbierto] = useState(false);
  const [jugadores, setJugadores] = useState(null);
  const [cargando, setCargando] = useState(false);
  const yaFetch = useRef(false);

  async function toggleJugadores() {
    if (abierto) { setAbierto(false); return; }

    if (jugadoresCache[equipo.id]) {
      setJugadores(jugadoresCache[equipo.id]);
      setAbierto(true);
      return;
    }

    if (yaFetch.current) return;
    yaFetch.current = true;

    setCargando(true);
    try {
      const res = await listJugadoresPorEquipo({ equipoId: equipo.id });
      const lista = [...(res.data?.jugadors || [])]
        .sort((a, b) => a.numeroCamiseta - b.numeroCamiseta)
        .filter((j, i, arr) => arr.findIndex(x => x.id === j.id) === i);

      setJugadores(lista);
      setAbierto(true);
      jugadoresCache[equipo.id] = lista;
    } catch (e) {
      console.error(e);
      setJugadores([]);
      yaFetch.current = false;
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={{
      borderRadius: 12,
      border: "1px solid var(--border)",
      marginBottom: 10,
      overflow: "hidden",
      background: "var(--accent-bg)",
      borderLeft: `3px solid ${accent}`,
    }}>
      <div
        onClick={toggleJugadores}
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: `${accent}22`,
            border: `1px solid ${accent}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: accent,
          }}>
            {equipo.nombre.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-h)" }}>
              {equipo.nombre}
            </div>
            <div style={{ fontSize: 12, color: "var(--text)", opacity: 0.5 }}>
              {equipo.ciudad}
            </div>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "var(--text)", opacity: 0.4 }}>
          {cargando ? "cargando..." : abierto ? "▲ ocultar" : "▼ jugadores"}
        </span>
      </div>

      {abierto && jugadores && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "8px 16px 12px" }}>
          {jugadores.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text)", opacity: 0.4, margin: "8px 0" }}>
              Sin jugadores registrados
            </p>
          ) : (
            jugadores.map(j => (
              <div key={j.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "7px 0",
                borderBottom: "0.5px solid var(--border)",
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: `${accent}22`,
                  border: `1px solid ${accent}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: accent, flexShrink: 0
                }}>
                  {j.numeroCamiseta}
                </span>
                <span style={{ flex: 1, fontSize: 14, color: "var(--text-h)" }}>{j.nombre}</span>
                <span style={{ fontSize: 12, color: "var(--text)", opacity: 0.45 }}>{j.posicion}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function DivisionGrupo({ division, visible }) {
  const [equipos, setEquipos] = useState(null);
  const fetchedRef = useRef(false);
  const accent = NIVEL_ACCENT[division.nivel] || "var(--accent)";

  useEffect(() => {
    if (!visible || fetchedRef.current) return;
    fetchedRef.current = true;
    listEquiposPorDivision({ divisionId: division.id })
      .then(res => setEquipos(res.data?.equipos || []))
      .catch(() => setEquipos([]));
  }, [visible, division.id]);

  if (!visible) return null;

  return (
    <div style={{ marginBottom: 32, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: accent, display: "inline-block", flexShrink: 0
        }} />
        <h3 style={{
          margin: 0, fontSize: 14, fontWeight: 600,
          color: "var(--text-h)", textTransform: "uppercase",
          letterSpacing: "0.06em"
        }}>
          {division.nivel} — {division.nombre}
        </h3>
        {equipos && (
          <span style={{ fontSize: 12, color: "var(--text)", opacity: 0.45 }}>
            {equipos.length} equipo{equipos.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {equipos === null && (
        <p style={{ fontSize: 13, color: "var(--text)", opacity: 0.5 }}>Cargando equipos...</p>
      )}
      {equipos?.map(eq => (
        <EquipoCard key={eq.id} equipo={eq} accent={accent} />
      ))}
    </div>
  );
}

function DeportePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const deporteNombre = DEPORTES[id] || "Deporte";

  const [partidos, setPartidos] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [divisionActiva, setDivisionActiva] = useState("todas");

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      setError(null);
      try {
        const [resPartidos, resDivisiones] = await Promise.all([
          listPartidosPorDeporte({ deporteId: id }),
          listDivisionesPorDeporte({ deporteId: id }),
        ]);
        setPartidos(resPartidos.data?.partidos || []);
        setDivisiones(resDivisiones.data?.divisions || []);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los datos.");
      } finally {
        setCargando(false);
      }
    }
    if (id) cargarDatos();
  }, [id]);

  const partidosFiltrados = divisionActiva === "todas"
    ? partidos
    : partidos.filter(p => p.division?.id === divisionActiva);

  return (
    <div className={"deporte-page" + (admin ? " admin-mode" : "")}>
      {admin && <div className="admin-badge">Admin</div>}
      <div className="banner-accent" />

      <button className="volver-btn" onClick={() => navigate("/deportes")}>← Volver</button>

      <header className="deporte-banner">
        <p className="banner-ano">2026</p>
        <h1 className="deporte-titulo">{deporteNombre}</h1>
      </header>

      {cargando && (
        <p style={{ textAlign: "center", padding: "2rem", color: "var(--text)", opacity: 0.5 }}>
          Cargando datos...
        </p>
      )}
      {error && (
        <p style={{ textAlign: "center", padding: "2rem", color: "#ef4444" }}>❌ {error}</p>
      )}

      {!cargando && !error && (
        <>
          {divisiones.length > 0 && (
            <section style={{
              padding: "0 24px 24px",
              width: "100%",
              maxWidth: 720,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <div style={{ width: "100%", maxWidth: 500 }}>
                <label style={{
                  display: "block", fontSize: 11, fontWeight: 700,
                  color: "var(--accent)", letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 8
                }}>
                  División
                </label>
                <select
                  value={divisionActiva}
                  onChange={e => setDivisionActiva(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 36px 10px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    background: "var(--accent-bg)",
                    color: "var(--text-h)",
                    fontSize: 14, fontWeight: 500,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    outline: "none",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23f97316' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="todas">— Todas las divisiones —</option>
                  {divisiones.map(div => (
                    <option key={div.id} value={div.id}>
                      {div.nivel} · {div.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </section>
          )}

          <section className="partidos-section">
            <h2 className="section-titulo">Partidos</h2>
            {partidosFiltrados.length === 0 ? (
              <p className="partidos-vacio">No hay partidos para esta división</p>
            ) : (
              <div className="partidos-lista">
                {[...partidosFiltrados]
                  .sort((a, b) => new Date(a.fechaPartido) - new Date(b.fechaPartido))
                  .map(p => <PartidoCard key={p.id} partido={p} />)}
              </div>
            )}
          </section>

          <section className="partidos-section">
            <h2 className="section-titulo">Equipos</h2>
            {divisiones.map(div => (
              <DivisionGrupo
                key={div.id}
                division={div}
                visible={divisionActiva === "todas" || divisionActiva === div.id}
              />
            ))}
          </section>
        </>
      )}

      <section className="favoritos-section">
        <button className="favoritos-btn" onClick={() => navigate("/deporte/" + id + "/favoritos")}>
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