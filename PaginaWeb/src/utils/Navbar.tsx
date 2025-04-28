import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageSquare, Menu, X } from "lucide-react";
import logo2 from "../../public/Inicio/logo2.png";

interface Navbarprops {
  children: React.ReactNode;
}

const Navbar: React.FC<Navbarprops> = ({ children }) => {
  const [] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-6 py-6 shadow-md shadow-black/40 z-50">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
          <div className="flex items-center gap-2">
            <h1 className="pb-6 text-2xl font-bold text-white">WIKIGEEK</h1>
            <img
              src={logo2}
              alt="Logo bigote"
              className="w-20 h-20 object-contain"
            />
          </div>
          </Link>
          {/* Logo y título */}
          

          {/* Icono hamburguesa (solo móvil) */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menú Desktop */}
          <ul className="hidden md:flex gap-4 items-center font-semibold text-sm">
            <li>
              <Link
                to="/peliculas"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all"
              >
                Películas
              </Link>
            </li>
            <li>
              <Link
                to="/Games"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all"
              >
                Juegos
              </Link>
            </li>
            <li>
              <Link
                to="/Books"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all"
              >
                Libros
              </Link>
            </li>
            <Link
              to="/IA"
              className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all"
            >
              Búsqueda por IA <MessageSquare size={16} />
            </Link>
            <Link
              to="/login"
              className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all"
            >
              Iniciar Session <MessageSquare size={16} />
            </Link>
            <Link
              to="/estrellas"
              className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all"
            >
              Estrellas <MessageSquare size={16} />
            </Link>
          </ul>
        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <ul className="flex flex-col gap-2 mt-4 md:hidden font-semibold text-sm">
            <li>
              <Link
                to="/peliculas"
                className="block bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md"
              >
                Películas
              </Link>
            </li>
            <li>
              <Link
                to="/juegos"
                className="block bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md"
              >
                Juegos
              </Link>
            </li>
            <li>
              <Link
                to="/libros"
                className="block bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md"
              >
                Libros
              </Link>
            </li>
            <li>
              <details className="bg-gray-900 rounded-md overflow-hidden border border-gray-800">
                <summary className="cursor-pointer px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                  Géneros <ChevronDown size={16} />
                </summary>
                <ul className="bg-gray-800">
                  <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                    Acción
                  </li>
                  <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                    Aventura
                  </li>
                  <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                    Ciencia ficción
                  </li>
                </ul>
              </details>
            </li>
            <Link
              to="/IA"
              className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
            >
              Búsqueda por IA <MessageSquare size={16} />
            </Link>
          </ul>
        )}
      </nav>

      <div className="bg-gradient-to-tr from-gray-950 via-neutral-900 to-black min-h-screen px-4 py-8">
        {children}
      </div>
    </>
  );
};

export default Navbar;
