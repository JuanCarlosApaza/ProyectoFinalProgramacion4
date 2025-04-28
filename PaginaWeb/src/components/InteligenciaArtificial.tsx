import { ChangeEvent, useEffect, useState } from "react";
import Busqueda from "./BuscarNombre";
import imagen1 from "../../public/IA/daysgone.jpg";
import imagen2 from "../../public/IA/thelastofus.jpg";
import imagen3 from "../../public/IA/wwz.jpg";
import imagen4 from "../../public/IA/coraline.jpg";
import imagen5 from "../../public/IA/troya.jpg";
import { Search } from "lucide-react";
import icono from "../../public/Inicio/logo1.png";
import Navbar from "../utils/Navbar";
import Stars from "./Estrellas";
import { useAuth } from "../context/AuthContext";

const GeminiTest = () => {
  const [, setResponse] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [filtro, setFiltro] = useState("");
  const { usuario } = useAuth();
  const [estrellas, setEstrellas] = useState(false);
  const [categoria, setCategoria] = useState<string>("");

  const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

  const extraerParentesis = (texto: string): string => {
    const match = texto.match(/\(([^)]+)\)/);
    return match ? match[1] : "No se encontró el nombre entre paréntesis";
  };
  const recibido = (valor: boolean) => {
    setEstrellas(valor);
  };

  useEffect(() => {
    const callGeminiAPI = async () => {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `A continuación te daré una descripción de una ${categoria}. Solo necesito que respondas con el nombre original de la saga en español entre paréntesis , seguido de una descripción detallada de la ${categoria} en un solo bloque de texto (unas 4 a 6 líneas). No hagas preguntas ni incluyas información irrelevante. Descripción: ${pregunta}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await res.json();
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
        setResponse(text);
        setFiltro(extraerParentesis(text));
        setEstrellas(true);
      } catch (error) {
        setResponse("Ocurrió un error al consultar la API.");
        setFiltro("Error");
        console.error("Error en la llamada a la API:", error);
      } finally {
        setEnviado(false);
      }
    };

    if (enviado) {
      callGeminiAPI();
    }
  }, [enviado, apikey, pregunta]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoria(event.target.value);
  };

  return (
    <div>
      <Navbar>
        <div className="text-center mx-auto mb-16 flex flex-col items-center justify-center">
          <div className="flex">
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-4">
            WIKIGEEK
          </h1>

            <img
              src={icono}
              className="w-10 sm:w-12 md:w-14 ml-2"
              alt="Ícono de Wikigeek"
            />
            <h1 className="text-white mt-5">IA</h1>
          </div>
          

          <p className="text-lg sm:text-xl md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Selecciona el género que deseas, y nuestra inteligencia artificial
            se encargará de buscar el contenido más relevante para ti. Podrás
            explorar los detalles completos y acceder fácilmente a cada uno de
            ellos.
          </p>
        </div>

        <div className="mb-4 items-center justify-center text-center flex relative">
          <img
            src={imagen3}
            alt=""
            className="opacity-100 -mr-10 mt-8 z-10 w-40 rounded-lg transition-all duration-500 ease-out hover:scale-105 hover:z-40"
          />
          <img
            src={imagen4}
            alt=""
            className="opacity-90 -mr-20 -mt-4 z-20 w-44 rounded-lg transition-all duration-500 ease-out hover:scale-105 hover:z-40"
          />
          <img
            src={imagen1}
            alt=""
            className="opacity-95 z-30 w-48 -mt-14 rounded-lg transition-all duration-500 ease-out hover:scale-110 hover:z-50"
          />
          <img
            src={imagen2}
            alt=""
            className="opacity-90 -ml-20 -mt-3 z-20 w-44 rounded-lg transition-all duration-500 ease-out hover:scale-105 hover:z-40"
          />
          <img
            src={imagen5}
            alt=""
            className="opacity-100 -ml-10 mt-10 z-10 w-40 rounded-lg transition-all duration-500 ease-out hover:scale-105 hover:z-40"
          />
        </div>

        <div className="items-center justify-center text-center mb-4 w-[100%]  ">
          <div>
            <select
              value={categoria}
              onChange={handleChange}
              className="bg-white w-[12%] justify-center text-center mx-auto m-4 p-2 rounded-2xl"
            >
              <option value="">Selecciona una Opcion</option>
              <option value="peliculas">Peliculas</option>
              <option value="juegos">Juegos</option>
              <option value="libros">Libros</option>
            </select>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <input
              type="text"
              name="pregunta"
              id="pregunta"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              className="lg:w-[25%] p-4 border border-black rounded-2xl text-black bg-white w-full"
              placeholder="Ej. Un joven mago asiste a una escuela mágica..."
            />
            <button
              type="submit"
              className="bg-white text-white px-4 border border-black py-4 rounded-full hover:bg-black hover:border-white transition-colors duration-300"
            >
              <Search className="w-8 h-6 text-black hover:text-white " />
            </button>
          </form>
        </div>
        {estrellas && (
          <Stars
            userId={usuario?.displayName ?? "anonimo"}
            contenido={filtro ?? "probando"}
            enviado={recibido}
            categoria={categoria}
          />
        )}

        <Busqueda categoria={categoria} nombre={filtro} />
      </Navbar>
    </div>
  );
};

export default GeminiTest;
