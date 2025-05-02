import { useState } from "react";
import { Link } from "react-router-dom";
import {  MessageSquare, Menu, X, Clapperboard, Gamepad2, BookOpen, FileText } from "lucide-react";
import logo2 from "../../public/Inicio/logo2.png";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/CerrarSession";

interface Navbarprops {
  children: React.ReactNode;
}

const Navbar: React.FC<Navbarprops> = ({ children }) => {
  const [] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { usuario } = useAuth();

  return (
    <>
      <nav className="w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white px-6 py-6 shadow-md shadow-black/40 z-50">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <h1 className="pb-6 text-2xl font-bold text-white">WIKIGEEK</h1>
              <img
                src={logo2}
                alt="Logo bigote"
                className="w-20 h-20 object-contain"
              />
              <h1>IA</h1>
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
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all flex items-center gap-2"
              >
                Películas <Clapperboard size={16} />
              </Link>
            </li>
            <li>
              <Link
                to="/Games"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all flex items-center gap-2"
              >
                Juegos <Gamepad2 size={16} />
              </Link>
            </li>
            <li>
              <Link
                to="/Books"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all flex items-center gap-2"
              >
                Libros <BookOpen size={16} />
              </Link>
            </li>

            <Link
              to="/IA"
              className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all"
            >
              Búsqueda por IA <MessageSquare size={16} />
            </Link>

            <li>
              {usuario?.displayName === "Marlene" && (
                <Link
                  to="/administrar"
                  className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md transition-all flex items-center gap-2"
                >
                  Reportes <FileText size={16} />
                </Link>
              )}
            </li>

            {usuario ? (
              <div className="bg-gray-900  border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all">
                {usuario.displayName} <LogoutButton />
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all"
              >
                Iniciar Session
              </Link>
            )}
          </ul>

        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <ul className="flex flex-col gap-2 mt-4 md:hidden font-semibold text-sm">
          <li>
            <Link
              to="/peliculas"
              className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
            >
              Películas <Clapperboard size={16} />
            </Link>
          </li>
          <li>
            <Link
              to="/Games"
              className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
            >
              Juegos <Gamepad2 size={16} />
            </Link>
          </li>
          <li>
            <Link
              to="/Books"
              className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
            >
              Libros <BookOpen size={16} />
            </Link>
          </li>
          
          <Link
            to="/IA"
            className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
          >
            Búsqueda por IA <MessageSquare size={16} />
          </Link>
          {usuario?.displayName === "Marlene" && (
            <Link
              to="/administrar"
              className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
            >
              Reportes <FileText size={16} />
            </Link>
          )}
          {usuario ? (
              <div className="w-full bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2">
                {usuario.displayName} <LogoutButton />
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 hover:bg-gray-700 border border-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-all"
              >
                Iniciar Session
              </Link>
            )}
        </ul>

        )}
      </nav>
      <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen px-4 py-8">
        {children}
      </div>
    </>
  );
};

export default Navbar;
