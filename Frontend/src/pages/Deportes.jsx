import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { listSponsors, listProductosCantinaDisponibles, createProductoCantina, updateProductoCantina, deleteProductoCantina } from "../services/api.js";
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
        onBlur={() => { onSave(draft); setEditing(false); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") { onSave(draft); setEditing(false); }
        }}
        autoFocus
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      className={className + (admin ? " editable" : "")}
      onClick={() => { if (admin) { setDraft(value); setEditing(true); } }}
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
        <input className="modal-input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Renault" />
        <label className="modal-label">URL del logo</label>
        <input className="modal-input" value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://ejemplo.com/logo.png" />
        <div className="modal-acciones">
          <button className="modal-btn modal-btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="modal-btn modal-btn-guardar" onClick={() => { onSave({ nombre, imagen }); onClose(); }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

function ProductoModal({ producto, onSave, onClose, loading }) {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion || "");
  const [precio, setPrecio] = useState(producto?.precio?.toString() || "");
  const [categoria, setCategoria] = useState(producto?.categoria || "");
  const [imagenUrl, setImagenUrl] = useState(producto?.imagenUrl || "");
  const [disponible, setDisponible] = useState(producto?.disponible ?? true);

  const esEdicion = !!producto?.id;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-titulo">{esEdicion ? "Editar Producto" : "Nuevo Producto"}</h3>

        <label className="modal-label">Nombre *</label>
        <input className="modal-input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Choripán" />

        <label className="modal-label">Descripción</label>
        <input className="modal-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Ej: Con chimichurri" />

        <label className="modal-label">Precio *</label>
        <input className="modal-input" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 2500" />

        <label className="modal-label">Categoría</label>
        <input className="modal-input" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ej: bebidas, comidas, snacks" />

        <label className="modal-label">URL de imagen</label>
        <input className="modal-input" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} placeholder="https://..." />

        {esEdicion && (
          <label className="modal-label" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
            Disponible
          </label>
        )}

        <div className="modal-acciones">
          <button className="modal-btn modal-btn-cancelar" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button
            className="modal-btn modal-btn-guardar"
            disabled={loading || !nombre || !precio}
            onClick={() => onSave({ nombre, descripcion, precio: parseFloat(precio), categoria, imagenUrl, disponible })}
          >
            {loading ? "Guardando..." : "Guardar"}
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
  const [bannerSubtitulo, setBannerSubtitulo] = useState("Torneo Deportivo Intercolegial");
  const [bannerAno, setBannerAno] = useState("2027");
  const [fecha, setFecha] = useState("15/04/2027");
  const [horario, setHorario] = useState("9:00 - 17:00");
  const [lugar, setLugar] = useState("Instituto Técnico Renault");

  const [deportes, setDeportes] = useState([
    { id: "44edf1eb-e95c-40c8-9a42-e4655707d439", nombre: "Fútbol", inicial: "F", imagen: "https://www.clarin.com/2025/06/17/IOfIZWHY5_2000x1500__1.jpg" },
    { id: "77d08f9b-9244-4584-bad9-f91b0ed4f36c", nombre: "Básquet", inicial: "B", imagen: "https://fotos.perfil.com/2023/04/24/trim/720/410/basquet-1553477.jpg" },
    { id: "a87f074f-a29d-49dc-a13d-64dd4ff78908", nombre: "Vóley", inicial: "V", imagen: "https://media.tycsports.com/files/2022/09/30/486024/voley_862x485.webp?v=1" },
  ]);

  const [sponsors, setSponsors] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [mutationLoading, setMutationLoading] = useState(false);

  const [productoModal, setProductoModal] = useState(null); // null | { modo: "crear" | "editar", producto?: {} }
  const [sponsorModalIndex, setSponsorModalIndex] = useState(null);

  const fetchProductos = () => {
    setLoadingProductos(true);
    listProductosCantinaDisponibles()
      .then((res) => setProductos(res.data?.productoCantinas || []))
      .catch((e) => console.error("Error cargando productos:", e))
      .finally(() => setLoadingProductos(false));
  };

  useEffect(() => {
    fetchProductos();
    listSponsors()
      .then((res) => setSponsors(res.data?.sponsors || []))
      .catch((e) => console.error("Error cargando sponsors:", e));
  }, []);

const handleGuardarProducto = async (data) => {
  setMutationLoading(true);
  try {
    if (productoModal.modo === "crear") {
      // Sacamos disponible — Firebase lo defaultea a true solo
      const { disponible, ...createData } = data;
      await createProductoCantina(createData);
    } else {
      await updateProductoCantina({ id: productoModal.producto.id, ...data });
    }
    fetchProductos();
    setProductoModal(null);
  } catch (e) {
    console.error("Error guardando producto:", e);
  } finally {
    setMutationLoading(false);
  }
};

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    setMutationLoading(true);
    try {
      await deleteProductoCantina({ id });
      fetchProductos();
    } catch (e) {
      console.error("Error eliminando producto:", e);
    } finally {
      setMutationLoading(false);
    }
  };

  const actualizarDeporte = (i, nombre) => {
    setDeportes((prev) =>
      prev.map((d, j) => j === i ? { ...d, nombre, inicial: nombre.charAt(0).toUpperCase() } : d)
    );
  };

  return (
    <div className={"deportes-page" + (admin ? " admin-mode" : "")}>
      {admin && <div className="admin-badge">Admin</div>}

      <div className="banner-accent" />

      <header className="deportes-banner">
        <InlineEdit value={bannerAno} onSave={setBannerAno} className="banner-ano" admin={admin} placeholder="2027" />
        <InlineEdit value={bannerTitulo} onSave={setBannerTitulo} className="banner-titulo" admin={admin} placeholder="Título del torneo" />
        <InlineEdit value={bannerSubtitulo} onSave={setBannerSubtitulo} className="banner-subtitulo" admin={admin} placeholder="Subtítulo" />
        <div className="banner-detalles">
          <InlineEdit value={fecha} onSave={setFecha} className="banner-dato" admin={admin} placeholder="Fecha del evento" />
          {fecha && horario && <span className="banner-dato-sep">|</span>}
          <InlineEdit value={horario} onSave={setHorario} className="banner-dato" admin={admin} placeholder="Horario" />
          {(fecha || horario) && lugar && <span className="banner-dato-sep">|</span>}
          <InlineEdit value={lugar} onSave={setLugar} className="banner-dato" admin={admin} placeholder="Lugar" />
        </div>
      </header>

      <section className="deportes-section">
        <h2 className="section-titulo">Elegí tu disciplina</h2>
        <div className="deportes-grid">
          {deportes.map((deporte, i) => (
            <div key={i} className="deporte-card" onClick={() => navigate("/deporte/" + deporte.id)}>
              <div className="deporte-icono" style={{ backgroundImage: `url(${deporte.imagen})` }}>
                <span className="deporte-icono-overlay" />
              </div>
              <InlineEdit value={deporte.nombre} onSave={(v) => actualizarDeporte(i, v)} className="deporte-nombre" admin={admin} placeholder="Nombre del deporte" />
            </div>
          ))}
        </div>
      </section>

      <section className="cantina-section">
        <div className="section-line" />
        <h2 className="section-titulo">Cantina</h2>
        <div className="productos-grid">
          {loadingProductos ? (
            <p style={{ color: "var(--text)", opacity: 0.4, fontSize: 14 }}>Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p style={{ color: "var(--text)", opacity: 0.4, fontSize: 14 }}>No hay productos disponibles.</p>
          ) : (
            productos.map((p) => (
              <div key={p.id} className={"producto-card" + (admin ? " producto-card-admin" : "")}>
                {p.imagenUrl && <img src={p.imagenUrl} alt={p.nombre} className="producto-imagen" />}
                <span className="producto-nombre">{p.nombre}</span>
                {p.descripcion && <span className="producto-detalles">{p.descripcion}</span>}
                <span className="producto-precio">${p.precio}</span>
                {p.categoria && <span className="producto-categoria">{p.categoria}</span>}
                {admin && (
                  <div className="producto-admin-acciones" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="modal-btn modal-btn-guardar"
                      style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => setProductoModal({ modo: "editar", producto: p })}
                    >
                      Editar
                    </button>
                    <button
                      className="modal-btn modal-btn-cancelar"
                      style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => handleEliminarProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        {admin && (
          <button className="agregar-btn" onClick={() => setProductoModal({ modo: "crear", producto: null })}>
            + Agregar producto
          </button>
        )}
      </section>

      <section className="sponsors-section">
        <div className="section-line" />
        <h2 className="section-titulo">Sponsors</h2>
        <div className="sponsors-grid">
          {sponsors.length === 0 ? (
            <p style={{ color: "var(--text)", opacity: 0.4, fontSize: 14 }}>Cargando sponsors...</p>
          ) : (
            sponsors.map((s) => (
              <a key={s.id} href={s.sitioWeb || "#"} target="_blank" rel="noopener noreferrer" className="sponsor-card" style={{ textDecoration: "none" }}>
                {s.logoUrl ? (
                  <div className="sponsor-logo-wrap">
                    <img className="sponsor-logo" src={s.logoUrl} alt={s.nombre} />
                  </div>
                ) : (
                  <span className="sponsor-nombre-solo">{s.nombre}</span>
                )}
                <span className="sponsor-nombre">{s.nombre}</span>
                {s.slogan && <span style={{ fontSize: 11, color: "var(--text)", opacity: 0.5, textAlign: "center" }}>{s.slogan}</span>}
              </a>
            ))
          )}
        </div>
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
              setSponsors((prev) => prev.map((s, j) => (j === sponsorModalIndex ? data : s)));
            }
          }}
          onClose={() => setSponsorModalIndex(null)}
        />
      )}

      {admin && productoModal !== null && (
        <ProductoModal
          producto={productoModal.producto}
          onSave={handleGuardarProducto}
          onClose={() => setProductoModal(null)}
          loading={mutationLoading}
        />
      )}

      <button
        onClick={() => { logout(); navigate("/"); }}
        title="Cerrar sesión"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "var(--accent-bg)",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: 38,
          height: 38,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        👤
      </button>
    </div>

    
  );
}

export default Deportes;