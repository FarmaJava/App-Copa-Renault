import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./DeportePage.css";

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

const nombresPorDefecto = ["Fútbol", "Básquet", "Vóley"];

function DeportePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();
  const i = parseInt(id, 10);

  const deporteNombre = nombresPorDefecto[i] || "Deporte";

  const [campeon, setCampeon] = useState("");
  const [anioCampeon, setAnioCampeon] = useState("");
  const [categorias, setCategorias] = useState([""]);
  const [editCategoria, setEditCategoria] = useState(null);

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
              value={anioCampeon}
              onSave={setAnioCampeon}
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

      <footer className="deportes-footer">
        <p>© 2027 Copa Renault · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default DeportePage;
