import React, { useEffect, useState } from "react";
import { Comentarios } from "../Interface/Comentarios";
import CrearComentario from "./AgregarComentario";
import { getComentarios } from "../services/ComentariosServices";
import { Pencil, Trash2, MessageCircleMore } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DeleteComentario } from "../services/ComentariosServices";
import Swal from "sweetalert2";
import Likes from "./ListarLikes";
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
  const [visualizar, setvisualizar] = useState(false);

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

  const handlechange = (valor: boolean) => {
    setHabilitar(valor);
  };
  const botonmostrar = () => {
    if (!visualizar) {
      setvisualizar(true);
    } else {
      setvisualizar(false);
    }
  };
  const handleDelete = async (id: string) => {
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
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-2">
      <div className="flex items-center gap-4 mb-2">
        <Likes contentId={contentid ?? "0"} userId={usuario?.uid ?? "0"} />
        
        {/* Botón Comentarios - Estilo igual a Like/Dislike */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-lg opacity-75"></div>
          <button
            onClick={botonmostrar}
            className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-black hover:scale-105 transition-transform"
          >
            <MessageCircleMore 
              size={32}
              className="stroke-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
              stroke="url(#comment-gradient)"
            />
            
          </button>
          
          {/* Gradiente SVG para el icono */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="comment-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
  
      {visualizar && (
        <div className="space-y-4">
          {/* Crear nuevo comentario */}
          <div className="bg-[#111827] p-3 rounded-lg border border-gray-700">
            <CrearComentario
              contentId={contentid ?? "0"}
              user2={user ?? "usuario_desconocido"}
              userId={userId ?? "0"}
              accion={CargarComentarios}
            />
          </div>
          
          {/* Comentarios */}
          <div className="space-y-3">
            {comentarios.length > 0 ? (
              comentarios.map((comentario: any) => (
                <div
                  key={comentario.id}
                  className="bg-[#1f2937] p-3 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-white font-medium text-sm">
                      {comentario.usuario}
                    </p>
                    {usuario?.uid === comentario.userId && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlechange(true)}
                          className="text-white hover:text-gray-300"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(comentario.id)}
                          className="text-white hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
  
                  <form className="mt-2">
                    <textarea
                      className="w-full bg-transparent text-gray-300 text-sm resize-none focus:outline-none"
                      name="comentario"
                      value={comentario.comentario}
                      readOnly={!habilitar || usuario?.uid !== comentario.userId}
                    />
                    {usuario?.uid === comentario.userId && habilitar && (
                      <div className="mt-2">
                        <button className="bg-white text-black text-sm px-3 py-1 rounded-md font-semibold">
                          Aceptar
                        </button>
                      </div>
                    )}
                  </form>
  
                  <p className="text-gray-500 text-xs mt-1">
                    {comentario.fecha.toDate().toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">
                No hay comentarios aún.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MostrarComentarios;
