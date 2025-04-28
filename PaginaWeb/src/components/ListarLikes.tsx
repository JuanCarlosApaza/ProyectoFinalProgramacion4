import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  addLike,
  getLikes,
  getLikesCount,
  updateLikes,
} from "../services/LikeServices";
import { useEffect, useState } from "react";
import type { Likes } from "../Interface/Likes";

interface LikesProps {
  userId: string;
  contentId: string;
}

const Likes: React.FC<LikesProps> = ({ userId, contentId }) => {
  const [Lik, setLikes] = useState(0);
  const [DisLikes, setDisLikes] = useState(0);
  

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

  return (
    <>
      <div className="flex gap-4">
        <button onClick={() => DarAccion("likes")}>
          <ThumbsUp size={24} className="text-green-500" />
          <p className="text-white">{Lik}</p>
        </button>
        <button onClick={() => DarAccion("dislikes")}>
          <ThumbsDown size={24} className="text-red-500" />
          <p className="text-white">{DisLikes}</p>
        </button>
      </div>
    </>
  );
};

export default Likes;
