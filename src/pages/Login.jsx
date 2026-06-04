import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario:", userCredential.user);
      navigate("/deportes");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          className="login-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguqlCvNxN6-8bsEdJGrM2RcM4JszNFgP8fg&s"
          alt="logo"
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={iniciarSesion}>Entrar</button>

        <span className="login-registro-texto">
          ¿No tenés cuenta?{" "}
          <a href="/registro" className="login-registro-link">
            Registrarse
          </a>
        </span>
      </div>
    </div>
  );
}

export default Login;