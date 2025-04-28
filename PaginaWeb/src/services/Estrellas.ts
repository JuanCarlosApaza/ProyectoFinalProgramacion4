import { db } from "../Data/Firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { Estrellas } from "../Interface/Estrellas";
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
