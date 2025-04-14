import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import GeminiTest from "./components/InteligenciaArtificial";
import Peliculas from "./pages/Peliculas";
import { MediaDetailView } from "./components/Details";
import Juegos from "./pages/Juegos";


const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/IA" element={<GeminiTest/>} />
        <Route path="/Movies" element={<Peliculas/>} />
        <Route path="/Movies/:id" element={<MediaDetailView/>} />
        <Route path="/Games" element={<Juegos/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
