import { db } from "../Data/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Likes } from "../Interface/Likes";
export const addLike = async (likes: Omit<Likes, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "likes"), likes);
    return docRef.id;
  } catch (error) {
    console.error("Error a ", error);
    throw new Error("Error agregando like");
  }
};
export const getLikes = async (id: string, tipo: string): Promise<Likes[]> => {
  try {
    const q = query(
      collection(db, "likes"),
      where("contentId", "==", id),
      where("tipo", "==", tipo)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Likes[];
  } catch (error) {
    console.error("Error contando los likes: ", error);
    throw new Error("Error al contar likes");
  }
};
export const getLikesCount = async (
  id: string,
  tipo: string
): Promise<number> => {
  try {
    const q = query(
      collection(db, "likes"),
      where("contentId", "==", id),
      where("tipo", "==", tipo),
      where("estado", "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error contando los likes: ", error);
    throw new Error("Error al contar likes");
  }
};

export const updateLikes = async (
  id: string,
  updates: Partial<Likes>
): Promise<void> => {
  try {
    const docRef = doc(db, "likes", id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error actualizando like: ", error);
    throw new Error("Error actualizando like");
  }
};
