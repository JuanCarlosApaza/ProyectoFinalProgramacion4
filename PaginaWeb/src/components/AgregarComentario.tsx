import { useState } from "react";
import { addComentario } from "../services/ComentariosServices";
import { Comentarios } from "../Interface/Comentarios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

interface CrearComentarioProps {
  contentId: string;
  userId: string;
  user2: string;
  accion: () => void;
}

const CrearComentario: React.FC<CrearComentarioProps> = ({
  contentId,
  userId,
  user2,
  accion,
}) => {
  const [comentario, setComentario] = useState<string>("");
  const { usuario } = useAuth();

  const validarComentario = () => {
    if (comentario.length < 5) {
      Swal.fire({
        title: "Comentario demasiado corto",
        text: "El comentario debe tener al menos 5 caracteres.",
        icon: "warning",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "Entendido",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarComentario()) return;
    try {
      const nuevoComentario: Omit<Comentarios, "id"> = {
        usuario: user2,
        comentario: comentario,
        fecha: new Date(),
        userId,
        contentId,
      };
      await addComentario(nuevoComentario);

      setComentario("");
      Swal.fire({
        title: "Comentario enviado",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#22c55e",
        confirmButtonText: "Ok",
      });
      accion();
    } catch (error) {
      console.error("Error al crear el comentario: ", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear el comentario.",
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <>
      {usuario && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-black rounded-xl border border-gray-700 shadow-md max-w-lg mx-auto my-8"
        >
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            rows={4}
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Enviar Comentario
          </button>
        </form>
      )}
    </>
  );
};

export default CrearComentario;
