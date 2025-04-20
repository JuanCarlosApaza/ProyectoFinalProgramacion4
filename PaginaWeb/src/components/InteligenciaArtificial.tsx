import { useEffect, useState } from "react";
import Busqueda from "./BuscarNombre";
import imagen1 from "../../public/IA/daysgone.jpg";
import imagen2 from "../../public/IA/thelastofus.jpg";
import imagen3 from "../../public/IA/wwz.jpg";
import imagen4 from "../../public/IA/coraline.jpg";
import imagen5 from "../../public/IA/troya.jpg";
import { Search } from "lucide-react";
import icono from "../../public/Inicio/logo1.png";

const GeminiTest = () => {
  const [response, setResponse] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [filtro, setFiltro] = useState("");

  const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

  const extraerParentesis = (texto: string): string => {
    const match = texto.match(/\(([^)]+)\)/);
    return match ? match[1] : "No se encontró el nombre entre paréntesis";
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
                      text: `A continuación te daré una descripción de una película. Solo necesito que respondas con el nombre original de la saga en inglés entre paréntesis , seguido de una descripción detallada de la película en un solo bloque de texto (unas 4 a 6 líneas). No hagas preguntas ni incluyas información irrelevante. Descripción: ${pregunta}`,
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

  return (
    <div className="p-8 font-sans bg-black ">
      <div className="text-center mx-auto mb-16 flex justify-center">
        <h1 className="text-white text-3xl font-bold">WIKIGEEK</h1>
        <img src={icono} className="ml-4 " alt="" />
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
      <div className="items-center justify-center text-center mb-4 ">
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

      <Busqueda categoria="peliculas" nombre={filtro} />
    </div>
  );
};

export default GeminiTest;
