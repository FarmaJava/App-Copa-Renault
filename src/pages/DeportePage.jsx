import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./DeportePage.css";

// Componente reutilizable para edición inline (mismo patrón que en Deportes.jsx)
function InlineEdit({ value, onSave, className, admin, placeholder }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (admin && editing) {
    return (
      <input
        className={className + " inline-edit-input"}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          onSave(draft);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave(draft);
            setEditing(false);
          }
        }}
        autoFocus
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      className={className + (admin ? " editable" : "")}
      onClick={() => {
        if (admin) {
          setDraft(value);
          setEditing(true);
        }
      }}
      title={admin ? "Click para editar" : undefined}
    >
      {value || placeholder}
    </span>
  );
}

// Modal para editar o crear partidos. Incluye horario, cancha, categoría
// y el marcador con puntajes separados para local y visitante.
function PartidoModal({ partido, onSave, onClose }) {
  const [hora, setHora] = useState(partido?.hora || "");
  const [cancha, setCancha] = useState(partido?.cancha || "");
  const [categoria, setCategoria] = useState(partido?.categoria || "");
  const [local, setLocal] = useState(partido?.local || "");
  const [puntosLocal, setPuntosLocal] = useState(partido?.puntosLocal || "");
  const [puntosVisitante, setPuntosVisitante] = useState(partido?.puntosVisitante || "");
  const [visitante, setVisitante] = useState(partido?.visitante || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-partido" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-titulo">
          {partido ? "Editar Partido" : "Nuevo Partido"}
        </h3>

        <div className="modal-partido-info">
          <div className="modal-field">
            <label className="modal-label">Horario</label>
            <input
              className="modal-input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              placeholder="10:30"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Cancha</label>
            <input
              className="modal-input"
              value={cancha}
              onChange={(e) => setCancha(e.target.value)}
              placeholder="Cancha 1"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Categoría</label>
            <input
              className="modal-input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ej: Mayor"
            />
          </div>
        </div>

        <div className="modal-partido-marcador">
          <div className="modal-field modal-equipo-field">
            <label className="modal-label">Local</label>
            <input
              className="modal-input"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Equipo A"
            />
          </div>
          <div className="modal-field modal-puntos-field">
            <label className="modal-label">Pts</label>
            <input
              className="modal-input modal-input-puntos"
              value={puntosLocal}
              onChange={(e) => setPuntosLocal(e.target.value)}
              placeholder="0"
            />
          </div>
          <span className="modal-partido-guion">-</span>
          <div className="modal-field modal-puntos-field">
            <label className="modal-label">Pts</label>
            <input
              className="modal-input modal-input-puntos"
              value={puntosVisitante}
              onChange={(e) => setPuntosVisitante(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="modal-field modal-equipo-field">
            <label className="modal-label">Visitante</label>
            <input
              className="modal-input"
              value={visitante}
              onChange={(e) => setVisitante(e.target.value)}
              placeholder="Equipo B"
            />
          </div>
        </div>

        <div className="modal-acciones">
          <button className="modal-btn modal-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="modal-btn modal-btn-guardar"
            onClick={() => {
              onSave({ hora, cancha, categoria, local, puntosLocal, puntosVisitante, visitante });
              onClose();
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// Nombres de deportes según el índice en la URL (/deporte/0, /deporte/1, /deporte/2)
const nombresPorDefecto = ["Fútbol", "Básquet", "Vóley"];

// Datos de ejemplo: cada deporte tiene su propia lista de partidos
const partidosPorDefecto = [
  [
    { hora: "10:30", cancha: "Cancha 1", categoria: "Mayor", local: "Renault A", puntosLocal: "2", puntosVisitante: "0", visitante: "Renault B" },
    { hora: "12:00", cancha: "Cancha 2", categoria: "Intermedia", local: "Renault C", puntosLocal: "1", puntosVisitante: "1", visitante: "Renault A" },
  ],
  [
    { hora: "09:00", cancha: "Cancha 1", categoria: "Mayor", local: "Renault A", puntosLocal: "78", puntosVisitante: "65", visitante: "Renault B" },
    { hora: "10:30", cancha: "Cancha 2", categoria: "Intermedia", local: "Renault C", puntosLocal: "55", puntosVisitante: "70", visitante: "Renault A" },
  ],
  [
    { hora: "11:00", cancha: "Cancha 3", categoria: "Mayor", local: "Renault A", puntosLocal: "3", puntosVisitante: "0", visitante: "Renault B" },
    { hora: "14:00", cancha: "Cancha 1", categoria: "Intermedia", local: "Renault C", puntosLocal: "2", puntosVisitante: "3", visitante: "Renault A" },
  ],
];

// Página de detalle de cada deporte. Muestra campeón actual, categorías,
// partidos (con horario, cancha, categoría y marcador) y un botón a favoritos.
// En modo admin permite editar todos los campos inline y gestionar partidos.
function DeportePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();
  const i = parseInt(id, 10);

  const deporteNombre = nombresPorDefecto[i] || "Deporte";

  const [campeon, setCampeon] = useState("");
  const [añoCampeon, setAñoCampeon] = useState("");
  const [categorias, setCategorias] = useState([""]);
  const [editCategoria, setEditCategoria] = useState(null);
  const [partidos, setPartidos] = useState(partidosPorDefecto[i] || []);
  const [partidoModalIndex, setPartidoModalIndex] = useState(null);

  return (
    <div className={"deporte-page" + (admin ? " admin-mode" : "")}>
      {admin && <div className="admin-badge">Admin</div>}

      <div className="banner-accent" />

      <button className="volver-btn" onClick={() => navigate("/deportes")}>
        ← Volver
      </button>

      <header className="deporte-banner">
        <p className="banner-ano">2027</p>
        <h1 className="deporte-titulo">{deporteNombre}</h1>
      </header>

      <section className="campeon-section">
        <h2 className="section-titulo">Actual Campeón</h2>
        <div className="campeon-card">
          <div className="campeon-icono">🏆</div>
          <div className="campeon-info">
            <InlineEdit
              value={campeon}
              onSave={setCampeon}
              className="campeon-nombre"
              admin={admin}
              placeholder="Nombre del equipo"
            />
            <InlineEdit
              value={añoCampeon}
              onSave={setAñoCampeon}
              className="campeon-anio"
              admin={admin}
              placeholder="Año"
            />
          </div>
        </div>
      </section>

      <section className="categorias-section">
        <h2 className="section-titulo">Categorías</h2>
        <div className="categorias-lista">
          {categorias.map((cat, j) => (
            <div key={j} className="categoria-item">
              {admin && j === editCategoria ? (
                <input
                  className="inline-edit-input categoria-input"
                  value={cat}
                  onChange={(e) => {
                    const nuevas = [...categorias];
                    nuevas[j] = e.target.value;
                    setCategorias(nuevas);
                  }}
                  onBlur={() => setEditCategoria(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditCategoria(null);
                  }}
                  autoFocus
                  placeholder="Nombre de la categoría"
                />
              ) : (
                <span
                  className={"categoria-texto" + (admin ? " editable" : "")}
                  onClick={() => {
                    if (admin) setEditCategoria(j);
                  }}
                >
                  {cat || "Categoría"}
                </span>
              )}
              {admin && (
                <button
                  className="categoria-eliminar"
                  onClick={() => {
                    setCategorias((prev) => prev.filter((_, k) => k !== j));
                  }}
                  title="Eliminar"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {admin && (
          <button
            className="agregar-btn"
            onClick={() => setCategorias((prev) => [...prev, ""])}
          >
            + Agregar categoría
          </button>
        )}
      </section>

      <section className="partidos-section">
        <h2 className="section-titulo">Partidos</h2>
        {partidos.length === 0 ? (
          <p className="partidos-vacio">No hay partidos registrados</p>
        ) : (
          <div className="partidos-lista">
            {partidos.map((p, j) => (
              <div
                key={j}
                className={"partido-card" + (admin ? " partido-card-admin" : "")}
                onClick={() => {
                  if (admin) setPartidoModalIndex(j);
                }}
                title={admin ? "Click para editar" : undefined}
              >
                <div className="partido-meta">
                  <span className="partido-hora">{p.hora}</span>
                  <span className="partido-cancha">{p.cancha}</span>
                  <span className="partido-categoria">{p.categoria}</span>
                </div>
                <div className="partido-detalles">
                  <span className="partido-equipo">{p.local}</span>
                  <span className="partido-puntos-local">{p.puntosLocal}</span>
                  <span className="partido-guion">-</span>
                  <span className="partido-puntos-visitante">{p.puntosVisitante}</span>
                  <span className="partido-equipo">{p.visitante}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {admin && (
          <button
            className="agregar-btn"
            onClick={() => setPartidoModalIndex(partidos.length)}
          >
            + Agregar partido
          </button>
        )}
      </section>

      <section className="favoritos-section">
        <button
          className="favoritos-btn"
          onClick={() => navigate("/deporte/" + i + "/favoritos")}
        >
          ⭐ Ver favoritos
        </button>
      </section>

      <footer className="deportes-footer">
        <p>© 2027 Copa Renault · Todos los derechos reservados</p>
      </footer>

      {admin && partidoModalIndex !== null && (
        <PartidoModal
          partido={partidos[partidoModalIndex] || null}
          onSave={(data) => {
            if (partidoModalIndex >= partidos.length) {
              setPartidos((prev) => [...prev, data]);
            } else {
              setPartidos((prev) =>
                prev.map((p, j) => (j === partidoModalIndex ? data : p))
              );
            }
          }}
          onClose={() => setPartidoModalIndex(null)}
        />
      )}
    </div>
  );
}

export default DeportePage;
