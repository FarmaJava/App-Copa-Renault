import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/auth";

// Contexto de autenticación. Expone user, admin, loading y logout.
// Admin se activa automáticamente con el email admin@itr.com.
// Ctrl+; permite desactivar temporalmente el modo admin (adminOverride).
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [adminOverride, setAdminOverride] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdminUser = user?.email === "admin@itr.com";
  const admin = isAdminUser && !adminOverride;

  // Escucha cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAdminOverride(false);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Atajo de teclado Ctrl+; para toggle manual del modo admin
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.code === "Semicolon" && user?.email === "admin@itr.com") {
        e.preventDefault();
        setAdminOverride((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [user]);

  const logout = useCallback(() => signOut(auth), []);

  return (
    <AuthContext.Provider value={{ user, admin, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto desde cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
