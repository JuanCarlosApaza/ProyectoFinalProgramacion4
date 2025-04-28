import React, { useEffect, useState } from "react";
import { Comentarios } from "../Interface/Comentarios";
import CrearComentario from "./AgregarComentario";
import { getComentarios } from "../services/ComentariosServices";

interface MostrarComentariosProps {
  contentid: string;
  usuario: string;
  userId: string;
}

const MostrarComentarios: React.FC<MostrarComentariosProps> = ({
  contentid,
  usuario,
  userId,
}) => {
  const [comentarios, setComentarios] = useState<Comentarios[]>([]);

  const CargarComentarios = async () => {
    try {
      const data = await getComentarios(contentid);
      if (data) {
        setComentarios(data);
        console.log("Comentarios cargados: ", data);
      } else {
        console.log("No se encontraron comentarios para este ID.");
      }
    } catch (error) {
      console.error("Error al cargar los comentarios: ", error);
    }
  };

  useEffect(() => {
    CargarComentarios();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <CrearComentario
          contentId={contentid ?? "0"}
          usuario={usuario ?? "usuario_desconocido"}
          userId={userId ?? "0"}
          accion={CargarComentarios}
        />
      </div>

      <div className="flex flex-col gap-4 p-6 bg-black rounded-xl border border-gray-700 shadow-md">
        {comentarios.map((comentario: any) => (
          <div
            key={comentario.id}
            className="p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <p className="text-white font-semibold">{comentario.usuario}</p>

            <p className="text-gray-300 text-base mt-2">
              {comentario.comentario}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              {comentario.fecha.toDate().toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostrarComentarios;