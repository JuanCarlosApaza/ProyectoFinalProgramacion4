import { useEffect, useState } from "react";
import Busqueda from "./BuscarNombre";

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
                      text: `A continuación te daré una descripción de una película. Solo necesito que respondas con el nombre original de la saga en inglés entre paréntesis , seguido de una descripción detallada de la película en un solo bloque de texto (unas 4 a 6 líneas). No hagas preguntas ni incluyas información irrelevante. Descripción: ${pregunta}`
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
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
    <div className="p-8 font-sans">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <label htmlFor="pregunta" className="block text-lg font-medium">
          Describe tu película
        </label>
        <input
          type="text"
          name="pregunta"
          id="pregunta"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ej. Un joven mago asiste a una escuela mágica..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>

      <div className="space-y-2">
        <h1 className="text-xl font-bold">Respuesta de la IA:</h1>
        <p>{response}</p>

        <h2 className="text-lg font-semibold mt-4">El nombre es:</h2>
        <p className="text-blue-700 font-medium">{filtro}</p>
      </div>
      <Busqueda categoria="peliculas" nombre={filtro}/>
    </div>
  );
};

export default GeminiTest;
