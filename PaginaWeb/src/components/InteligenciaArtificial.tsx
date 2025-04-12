import { useEffect, useState } from "react";

const GeminiTest = () => {
  const [response, setResponse] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [enviado, setEnviado] = useState(false);
  const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
    if (enviado) {
      
    }
    const callGeminiAPI = async () => {
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
                    text: `te voy a pasar parametros de una pelicula no me vuelvas a preguntar que te pase parametros . Necesito que si lo ubicas, me des un resultado del nombre entre paréntesis y después el prompt puede ser normal (aqui va la descripcion de la pelicula: ${pregunta})`
                },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(text || "Sin respuesta");
      setEnviado(false);
    };
    if (enviado) {
      callGeminiAPI();
    }
  }, [enviado]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="" className="mb-4"> Describe tu pelicula</label>
        <input
          type="text"
          name="pregunta"
          className="mb-4"
          id="name"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <button className="mb-4 bg-blue-300 text-white" type="submit">
          enviar
        </button>
      </form>

      <h1>Respuesta de IA:</h1>
      <p>{response}</p>
    </div>
  );
};

export default GeminiTest;
