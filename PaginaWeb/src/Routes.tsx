import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import GeminiTest from "./components/InteligenciaArtificial";
import Peliculas from "./pages/Peliculas";
import Pruebas from "./components/BuscarNombre";


const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/IA" element={<GeminiTest/>} />
        <Route path="/Peliculas" element={<Peliculas/>} />
        {/* <Route path="/Pruebas" element={<Pruebas/>} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
