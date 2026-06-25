import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { registrarUsuarioEnDB } from "../services/api.js";
import "./Registro.css";

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    setError("");

    if (!nombre || !email || !password || !confirm) {
      setError("Completá todos los campos");
      return;
    }
    if (email === "admin@itr.com") {
      setError("No podés registrarte con ese correo");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      // 1. Crear usuario en Firebase Auth
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      // 2. Guardar en la base de datos con rol "usuario"
      await registrarUsuarioEnDB(nombre);

      navigate("/deportes");
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("Ya existe una cuenta con ese correo");
      } else if (e.code === "auth/invalid-email") {
        setError("El correo no es válido");
      } else if (e.code === "auth/weak-password") {
        setError("La contraseña es muy débil");
      } else {
        setError("Error al registrarse. Intentá de nuevo.");
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-page">
      <div className="registro-card">
        <img
          className="registro-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguqlCvNxN6-8bsEdJGrM2RcM4JszNFgP8fg&s"
          alt="logo"
        />
        <h2 className="registro-titulo">Crear cuenta</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
        />
        {error && <p className="registro-error">{error}</p>}
        <button onClick={handleRegistro} disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        <span className="registro-login-texto">
          ¿Ya tenés cuenta?{" "}
          <a href="/" className="registro-login-link">
            Iniciar sesión
          </a>
        </span>
      </div>
    </div>
  );
}

export default Registro;