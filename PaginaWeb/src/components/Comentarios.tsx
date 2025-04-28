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
    <>
      <div>
        <CrearComentario
          contentId={contentid ?? "0"}
          usuario={usuario ?? "usuario_desconocido"}
          userId={userId ?? "0"}
          accion={CargarComentarios}
        />
      </div>
      <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
        {comentarios.map((comentario: any) => (
          <div key={comentario.id} className="p-2 border-b border-gray-300">
            <p>{comentario.usuario}</p>

            <p className="text-base">{comentario.comentario}</p>
            <p className="text-sm text-gray-600">
              {comentario.fecha.toDate().toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default MostrarComentarios;
