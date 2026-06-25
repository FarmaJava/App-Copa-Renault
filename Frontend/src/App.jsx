import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Deportes from "./pages/Deportes";
import DeportePage from "./pages/DeportePage";
import Favoritos from "./pages/Favoritos";
import Registro from "./pages/Registro";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/deportes" element={<PrivateRoute><Deportes /></PrivateRoute>} />
      <Route path="/deporte/:id" element={<PrivateRoute><DeportePage /></PrivateRoute>} />
      <Route path="/deporte/:id/favoritos" element={<PrivateRoute><Favoritos /></PrivateRoute>} />
    </Routes>
  );
}

export default App;