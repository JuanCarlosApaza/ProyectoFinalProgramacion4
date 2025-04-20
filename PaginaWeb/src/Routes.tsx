import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import GeminiTest from "./components/InteligenciaArtificial";
import Peliculas from "./pages/Peliculas";

import Pruebas from "./components/BuscarNombre";


import { MediaDetailView } from "./components/Details";
import Juegos from "./pages/Juegos";
import Libros from "./pages/Libros";


const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/IA" element={<GeminiTest/>} />

        <Route path="/Peliculas" element={<Peliculas/>} />
        {/* <Route path="/Pruebas" element={<Pruebas/>} /> */}


        <Route path="/Movies/:id" element={<MediaDetailView 
        pagina="pelicula" 
        baseImg="https://image.tmdb.org/t/p/w500"/>} />
        <Route path="/Games" element={<Juegos/>}/>
        <Route path="/Games/:id" element={<MediaDetailView 
        pagina="Juegos"/>} />
        <Route path="/Books" element={<Libros/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
