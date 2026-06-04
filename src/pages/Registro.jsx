import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegistro = () => {
    setError("");

    if (!nombre || !email || !password || !confirm) {
      setError("Completá todos los campos");
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

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push({ nombre, email, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada correctamente");
    navigate("/");
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
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="registro-error">{error}</p>}

        <button onClick={handleRegistro}>Registrarse</button>

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
