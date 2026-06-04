import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Deportes from "./pages/Deportes";
import DeportePage from "./pages/DeportePage";
import Registro from "./pages/Registro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/deportes" element={<Deportes />} />
      <Route path="/deporte/:id" element={<DeportePage />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;