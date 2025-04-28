import { db } from "../Data/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  
} from "firebase/firestore";
import { Estrellas } from "../Interface/Estrellas";
import { Administrar } from "../Interface/Administrar";
export const addEstrella = async (
  estrellas: Omit<Estrellas, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "estrellas"), estrellas);
    return docRef.id;
  } catch (error) {
    console.error("Error a ", error);
    throw new Error("Error agregando estrella");
  }
};

export const getEstrellas = async (): Promise<Administrar> => {
    try {
      const querySnapshot = await getDocs(collection(db, "estrellas"));
      
      const busquedasPorCategoria: Record<string, number> = {};
      const busquedasPorEstrellas: Record<number, number> = {};
  
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Estrellas;
        const { categoria, contador } = data;
        
        if (!busquedasPorCategoria[categoria]) {
          busquedasPorCategoria[categoria] = 0;
        }
        busquedasPorCategoria[categoria] += 1;
  
        if (!busquedasPorEstrellas[contador]) {
          busquedasPorEstrellas[contador] = 0;
        }
        busquedasPorEstrellas[contador] += 1;
      });
  
      return {
        busquedasPorCategoria,
        busquedasPorEstrellas,
      };
    } catch (error) {
      console.error("Error obteniendo estrellas: ", error);
      throw new Error("No se pudo obtener las estrellas");
    }
  };
  