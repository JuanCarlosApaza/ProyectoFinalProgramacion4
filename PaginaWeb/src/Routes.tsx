import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import GeminiTest from "./components/InteligenciaArtificial";
import Peliculas from "./pages/Peliculas";
import { MediaDetailView } from "./components/Details";
import Juegos from "./pages/Juegos";
// import Libros from "./pages/Libros";
import LibroLeer from "./pages/LibroListar";
import Register from "./components/Registrarse";
import Login from "./components/Login";
import Pruebas from "./test/Pruebas";
import { AuthProvider } from "./context/AuthContext";
import Administrar from "./pages/Administrar";

const Rutas = () => {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/IA" element={<GeminiTest />} />
          <Route path="/Books" element={<LibroLeer />} />
          <Route path="/Books/:id" element={<MediaDetailView pagina="Libros" />} />
          <Route path="/Peliculas" element={<Peliculas />} />
          <Route path="/Movies/:id" element={<MediaDetailView pagina="pelicula"  baseImg="https://image.tmdb.org/t/p/original" />} />
          <Route path="/Games" element={<Juegos />} />
          <Route path="/Games/:id" element={<MediaDetailView pagina="Juegos" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/pruebas" element={<Pruebas />} />
          <Route path="/administrar" element={<Administrar />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
};

export default Rutas;

