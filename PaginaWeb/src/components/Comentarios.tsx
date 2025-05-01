import React, { useEffect, useState } from "react";
import { Comentarios } from "../Interface/Comentarios";
import CrearComentario from "./AgregarComentario";
import { getComentarios } from "../services/ComentariosServices";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DeleteComentario } from "../services/ComentariosServices";
import Swal from "sweetalert2";
interface MostrarComentariosProps {
  contentid: string;
  user: string;
  userId: string;
}

const MostrarComentarios: React.FC<MostrarComentariosProps> = ({
  contentid,
  user,
  userId,
}) => {
  const [comentarios, setComentarios] = useState<Comentarios[]>([]);
  const { usuario } = useAuth();
  const [habilitar, setHabilitar] = useState(false); 

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

  const handlechange =(valor:boolean) => {
    setHabilitar(valor);
  }
  const handleDelete = async(id: string) => {
    Swal.fire({
          title: "¿Estás seguro?",
          text: `Vas a eliminar el comentario de , ${usuario?.displayName}`,
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await DeleteComentario(id);
              CargarComentarios(); 
              Swal.fire({
                title: "¡Comentario Eliminado!",
                text: "Eliminaste el comentario correctamente",
                icon: "success",
              });
            } catch (error) {
              console.error("Error al cerrar sesión:", error);
              Swal.fire({
                title: "Error",
                text: "Ocurrió un error al cerrar sesión",
                icon: "error",
              });
            }
          }
        });
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <CrearComentario
            contentId={contentid ?? "0"}
            user2={user ?? "usuario_desconocido"}
            userId={userId ?? "0"}
            accion={CargarComentarios}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4 p-6 bg-black rounded-xl border border-gray-700 shadow-md">
          {comentarios.map((comentario: any) => (
            <div
              key={comentario.id}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <p className="text-white font-semibold">{comentario.usuario}</p>
              <form action="">
                <textarea
                  className="text-gray-300 text-base mt-2 w-full"
                  name="comentario"
                  value={comentario.comentario}
                  readOnly={false}
                />
                {usuario?.uid === comentario.userId ? (
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={()=>handlechange(true)} className="text-white rounded-2xl p-2">
                      <Pencil />
                    </button>
                    <button type="button" onClick={()=>handleDelete(comentario.id)}  className="text-white rounded-2xl p-2">
                      <Trash2 />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {usuario?.uid === comentario.userId && habilitar ?  (
                  <button className="bg-white text-black rounded-2xl p-2">
                    Aceptar
                  </button>
                ) : (
                  <></>
                )}
              </form>

              <p className="text-gray-500 text-sm mt-2">
                {comentario.fecha.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostrarComentarios;
