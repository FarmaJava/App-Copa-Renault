import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Favoritos.css";

// Nombres de deportes según el índice en la URL
const nombresPorDefecto = ["Fútbol", "Básquet", "Vóley"];

// Datos de ejemplo para jugadores y equipos favoritos (hardcodeados)
const jugadores = [
  { nombre: "Lionel Messi", equipo: "Renault A", numero: 10 },
  { nombre: "LeBron James", equipo: "Renault B", numero: 23 },
  { nombre: "Luciano De Cecco", equipo: "Renault C", numero: 1 },
];

const equipos = ["Renault A", "Renault B", "Renault C"];

// Página de favoritos. Muestra equipos y jugadores favoritos del deporte seleccionado.
function Favoritos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();
  const i = parseInt(id, 10);

  const deporteNombre = nombresPorDefecto[i] || "Deporte";

  return (
    <div className={"favoritos-page" + (admin ? " admin-mode" : "")}>
      {admin && <div className="admin-badge">Admin</div>}

      <div className="banner-accent" />

      <button className="volver-btn" onClick={() => navigate("/deporte/" + i)}>
        ← Volver a {deporteNombre}
      </button>

      <header className="favoritos-header">
        <h1 className="favoritos-titulo">Favoritos</h1>
        <p className="favoritos-subtitulo">{deporteNombre}</p>
      </header>

      {/* Sección de equipos favoritos */}
      <section className="favoritos-section-inner">
        <h2 className="section-titulo">Equipos Favoritos</h2>
        <div className="favoritos-equipos-lista">
          {equipos.map((eq, j) => (
            <div key={j} className="favorito-equipo-card">
              <span className="favorito-equipo-icono">🏅</span>
              <span className="favorito-equipo-nombre">{eq}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de jugadores favoritos, cada uno con su número de camiseta */}
      <section className="favoritos-section-inner">
        <h2 className="section-titulo">Jugadores Favoritos</h2>
        <div className="favoritos-jugadores-lista">
          {jugadores.map((j, k) => (
            <div key={k} className="favorito-jugador-card">
              <span className="favorito-jugador-camisa">{j.numero}</span>
              <div className="favorito-jugador-info">
                <span className="favorito-jugador-nombre">{j.nombre}</span>
                <span className="favorito-jugador-equipo">{j.equipo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="deportes-footer">
        <p>© 2027 Copa Renault · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Favoritos;
