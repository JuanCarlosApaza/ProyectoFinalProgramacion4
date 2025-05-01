import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  addLike,
  getLikes,
  getLikesCount,
  updateLikes,
} from "../services/LikeServices";
import { useEffect, useState } from "react";
import type { Likes } from "../Interface/Likes";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
interface LikesProps {
  userId: string;
  contentId: string;
}

const Likes: React.FC<LikesProps> = ({ userId, contentId }) => {
  const [Lik, setLikes] = useState(0);
  const [DisLikes, setDisLikes] = useState(0);
  const {usuario} = useAuth();
  

  const CargarLikes = async (valor: string) => {
    const size = await getLikesCount(contentId, valor);
    if (valor === "likes") {
      setLikes(size);
    } else if (valor === "dislikes") {
      setDisLikes(size);
    }
  };

  const DarAccion = async (valor: string) => {
    const dataLikes = await getLikes(contentId, "likes");
    const dataDislikes = await getLikes(contentId, "dislikes");
  
    const comprobacionLike = dataLikes.find((dat: any) => dat.userId === userId);
    const comprobacionDislike = dataDislikes.find((dat: any) => dat.userId === userId);
  
    if (!comprobacionLike && !comprobacionDislike) {
      const addlike = {
        userId,
        contentId,
        tipo: valor,
        estado: true,
        fecha: new Date(),
      };
      await addLike(addlike);
    } else if (comprobacionLike) {
      if (valor === "likes") {
        if (comprobacionLike.estado) {
          await updateLikes(comprobacionLike.id, { estado: false });
        } else {
          await updateLikes(comprobacionLike.id, { estado: true });
        }
      } else if (valor === "dislikes") {
        await updateLikes(comprobacionLike.id, { tipo: "dislikes", estado: true });
      }
    } else if (comprobacionDislike) {
      if (valor === "dislikes") {
        if (comprobacionDislike.estado) {
          await updateLikes(comprobacionDislike.id, { estado: false });
        } else {
          await updateLikes(comprobacionDislike.id, { estado: true });
        }
      } else if (valor === "likes") {
        await updateLikes(comprobacionDislike.id, { tipo: "likes", estado: true });
      }
    }
  
    await CargarLikes("likes");
    await CargarLikes("dislikes");
  };
  
  

  useEffect(() => {
    CargarLikes("likes");
    CargarLikes("dislikes");
  }, []);

  const Notificaciones = () =>{
    Swal.fire({
      title: "Acción no permitida",
      text: "Debes iniciar sesión para dar like o dislike",
      icon: "warning",
      background: "#111",
      color: "#fff",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Entendido",
    });
  }
  return (
    <>
       
    <div className="flex justify-center items-center min-h-[300px]  gap-10">
      {/* Botón Like */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-lg opacity-75"></div>
        <button
          onClick={usuario?() => DarAccion("likes"):() =>Notificaciones()}
          className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-black hover:scale-105 transition-transform"
        >
          <ThumbsUp
            size={28}
            className="stroke-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
            stroke="url(#like-gradient)"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            {Lik}
          </span>
        </button>

        {/* Definimos el gradiente SVG */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="like-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Botón Dislike */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 blur-lg opacity-75"></div>
        <button
          onClick={usuario?() => DarAccion("dislikes"):()=>Notificaciones()}
          className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-black hover:scale-105 transition-transform"
        >
          <ThumbsDown
            size={28}
            className="stroke-[3px] bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-transparent bg-clip-text"
            stroke="url(#dislike-gradient)"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
            {DisLikes}
          </span>
        </button>

        {/* Definimos el gradiente SVG */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="dislike-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  
    </>
  );
};

export default Likes;
