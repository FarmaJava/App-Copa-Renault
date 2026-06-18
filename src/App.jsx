import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Deportes from "./pages/Deportes";
import DeportePage from "./pages/DeportePage";
import Favoritos from "./pages/Favoritos";
import Registro from "./pages/Registro";

// Mapa de rutas de la aplicación. Cada ruta renderiza su página correspondiente.
// /deporte/:id/favoritos permite acceder a favoritos por deporte.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/deportes" element={<Deportes />} />
      <Route path="/deporte/:id" element={<DeportePage />} />
      <Route path="/deporte/:id/favoritos" element={<Favoritos />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;