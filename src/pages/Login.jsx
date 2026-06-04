import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/auth";

function Login() {
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

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={iniciarSesion}>
        Iniciar Sesión
      </button>
    </div>
  );
}

export default Login;