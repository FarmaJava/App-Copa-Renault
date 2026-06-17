import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Deportes.css";

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

function SponsorModal({ sponsor, onSave, onClose }) {
  const [nombre, setNombre] = useState(sponsor?.nombre || "");
  const [imagen, setImagen] = useState(sponsor?.imagen || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-titulo">Editar Sponsor</h3>

        <label className="modal-label">Nombre de la empresa</label>
        <input
          className="modal-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Renault"
        />

        <label className="modal-label">URL del logo</label>
        <input
          className="modal-input"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="https://ejemplo.com/logo.png"
        />

        <div className="modal-acciones">
          <button className="modal-btn modal-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="modal-btn modal-btn-guardar"
            onClick={() => {
              onSave({ nombre, imagen });
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

function ProductoModal({ producto, onSave, onClose }) {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [detalles, setDetalles] = useState(producto?.detalles || "");
  const [precio, setPrecio] = useState(producto?.precio || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-titulo">
          {producto ? "Editar Producto" : "Nuevo Producto"}
        </h3>

        <label className="modal-label">Nombre</label>
        <input
          className="modal-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Choripán"
        />

        <label className="modal-label">Detalles</label>
        <input
          className="modal-input"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          placeholder="Ej: Con chimichurri"
        />

        <label className="modal-label">Precio</label>
        <input
          className="modal-input"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej: $2500"
        />

        <div className="modal-acciones">
          <button className="modal-btn modal-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="modal-btn modal-btn-guardar"
            onClick={() => {
              onSave({ nombre, detalles, precio });
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

function Deportes() {
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [bannerTitulo, setBannerTitulo] = useState("Copa Renault");
  const [bannerSubtitulo, setBannerSubtitulo] = useState(
    "Torneo Deportivo Intercolegial"
  );
  const [bannerAno, setBannerAno] = useState("2027");
  const [fecha, setFecha] = useState("15/04/2027");
  const [horario, setHorario] = useState("9:00 - 17:00");
  const [lugar, setLugar] = useState("Instituto Técnico Renault");

  const [deportes, setDeportes] = useState([
    { nombre: "Fútbol", inicial: "F", imagen: "https://www.clarin.com/2025/06/17/IOfIZWHY5_2000x1500__1.jpg" },
    { nombre: "Básquet", inicial: "B", imagen: "https://fotos.perfil.com/2023/04/24/trim/720/410/basquet-1553477.jpg" },
    { nombre: "Vóley", inicial: "V", imagen: "https://media.tycsports.com/files/2022/09/30/486024/voley_862x485.webp?v=1" },
  ]);

  const [sponsors, setSponsors] = useState(
    Array.from({ length: 4 }, () => ({ nombre: "", imagen: "" }))
  );
  const [sponsorModalIndex, setSponsorModalIndex] = useState(null);

  const [productos, setProductos] = useState([
    { nombre: "", detalles: "", precio: "" },
    { nombre: "", detalles: "", precio: "" },
    { nombre: "", detalles: "", precio: "" },
  ]);
  const [productoModalIndex, setProductoModalIndex] = useState(null);

  const actualizarDeporte = (i, nombre) => {
    setDeportes((prev) =>
      prev.map((d, j) =>
        j === i ? { ...d, nombre, inicial: nombre.charAt(0).toUpperCase() } : d
      )
    );
  };

  return (
    <div className={"deportes-page" + (admin ? " admin-mode" : "")}>
      {admin && <div className="admin-badge">Admin</div>}

      <div className="banner-accent" />

      <header className="deportes-banner">
        <InlineEdit
          value={bannerAno}
          onSave={setBannerAno}
          className="banner-ano"
          admin={admin}
          placeholder="2027"
        />
        <InlineEdit
          value={bannerTitulo}
          onSave={setBannerTitulo}
          className="banner-titulo"
          admin={admin}
          placeholder="Título del torneo"
        />
        <InlineEdit
          value={bannerSubtitulo}
          onSave={setBannerSubtitulo}
          className="banner-subtitulo"
          admin={admin}
          placeholder="Subtítulo"
        />
        <div className="banner-detalles">
          <InlineEdit
            value={fecha}
            onSave={setFecha}
            className="banner-dato"
            admin={admin}
            placeholder="Fecha del evento"
          />
          {fecha && horario && <span className="banner-dato-sep">|</span>}
          <InlineEdit
            value={horario}
            onSave={setHorario}
            className="banner-dato"
            admin={admin}
            placeholder="Horario"
          />
          {(fecha || horario) && lugar && (
            <span className="banner-dato-sep">|</span>
          )}
          <InlineEdit
            value={lugar}
            onSave={setLugar}
            className="banner-dato"
            admin={admin}
            placeholder="Lugar"
          />
        </div>
      </header>

      <section className="deportes-section">
        <h2 className="section-titulo">Elegí tu disciplina</h2>
        <div className="deportes-grid">
          {deportes.map((deporte, i) => (
            <div
              key={i}
              className="deporte-card"
              onClick={() => navigate("/deporte/" + i)}
            >
              <div
                className="deporte-icono"
                style={{ backgroundImage: `url(${deporte.imagen})` }}
              >
                <span className="deporte-icono-overlay" />
              </div>
              <InlineEdit
                value={deporte.nombre}
                onSave={(v) => actualizarDeporte(i, v)}
                className="deporte-nombre"
                admin={admin}
                placeholder="Nombre del deporte"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="cantina-section">
        <div className="section-line" />
        <h2 className="section-titulo">Cantina</h2>
        <div className="productos-grid">
          {productos.map((p, i) => (
            <div
              key={i}
              className={
                "producto-card" + (admin ? " producto-card-admin" : "")
              }
              onClick={() => {
                if (admin) setProductoModalIndex(i);
              }}
              title={admin ? "Click para editar" : undefined}
            >
              {p.nombre ? (
                <>
                  <span className="producto-nombre">{p.nombre}</span>
                  <span className="producto-detalles">{p.detalles}</span>
                  <span className="producto-precio">{p.precio}</span>
                </>
              ) : (
                <span className="producto-vacio">Vacío</span>
              )}
            </div>
          ))}
        </div>
        {admin && (
          <button
            className="agregar-btn"
            onClick={() =>
              setProductoModalIndex(productos.length)
            }
          >
            + Agregar producto
          </button>
        )}
      </section>

      <section className="sponsors-section">
        <div className="section-line" />
        <h2 className="section-titulo">Sponsors</h2>
        <div className="sponsors-grid">
          {sponsors.map((s, i) => (
            <div
              key={i}
              className={"sponsor-card" + (admin ? " sponsor-card-admin" : "")}
              onClick={() => {
                if (admin) setSponsorModalIndex(i);
              }}
              title={admin ? "Click para editar" : undefined}
            >
              {s.imagen ? (
                <div className="sponsor-logo-wrap">
                  <img className="sponsor-logo" src={s.imagen} alt={s.nombre} />
                </div>
              ) : s.nombre ? (
                <span className="sponsor-nombre-solo">{s.nombre}</span>
              ) : (
                <div className="sponsor-placeholder" />
              )}
              {s.nombre && (
                <span className="sponsor-nombre">{s.nombre}</span>
              )}
            </div>
          ))}
        </div>
        {admin && (
          <button
            className="agregar-btn"
            onClick={() => setSponsorModalIndex(sponsors.length)}
          >
            + Agregar sponsor
          </button>
        )}
      </section>

      <footer className="deportes-footer">
        <p>© {bannerAno} Copa Renault · Todos los derechos reservados</p>
      </footer>

      {admin && sponsorModalIndex !== null && (
        <SponsorModal
          sponsor={sponsors[sponsorModalIndex] || { nombre: "", imagen: "" }}
          onSave={(data) => {
            if (sponsorModalIndex >= sponsors.length) {
              setSponsors((prev) => [...prev, data]);
            } else {
              setSponsors((prev) =>
                prev.map((s, j) => (j === sponsorModalIndex ? data : s))
              );
            }
          }}
          onClose={() => setSponsorModalIndex(null)}
        />
      )}

      {admin && productoModalIndex !== null && (
        <ProductoModal
          producto={
            productoModalIndex < productos.length
              ? productos[productoModalIndex]
              : null
          }
          onSave={(data) => {
            if (productoModalIndex >= productos.length) {
              setProductos((prev) => [...prev, data]);
            } else {
              setProductos((prev) =>
                prev.map((p, j) => (j === productoModalIndex ? data : p))
              );
            }
          }}
          onClose={() => setProductoModalIndex(null)}
        />
      )}
    </div>
  );
}

export default Deportes;
