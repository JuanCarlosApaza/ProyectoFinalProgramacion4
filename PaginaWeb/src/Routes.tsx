import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import GeminiTest from "./components/InteligenciaArtificial";


const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/IA" element={<GeminiTest/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
