import { db } from "../Data/Firebase";
import { collection, addDoc,  getDocs, updateDoc, deleteDoc, doc, query, getDoc, where } from "firebase/firestore";
import { Comentarios } from "../Interface/Comentarios";
export const addComentario = async (comentario: Omit<Comentarios, 'id'>):Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, "comentarios"), comentario);
        return docRef.id;
    } catch (error) {
        console.error("Error adding comentario: ", error);
        throw new Error("Error adding comentario");
        
    }
}
export const getComentarios = async (id:string):Promise<Comentarios[]>=>{
    try {
        const q = query(collection(db, "comentarios"),where("contentId", "==", id));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc)=>({id:doc.id, ...doc.data()} as Comentarios));   
    } catch (error) {
        console.error("Error getting comentarios: ", error);
        throw new Error("Error getting comentarios");
        
    }
}
// export const getComentarioById = async (id: string): Promise<Comentarios | null> => {
//     try {
//       const q = query(collection(db, "comentarios"), where("contentId", "==", id));
//       const querySnapshot = await getDocs(q);
  
//       if (!querySnapshot.empty) {
//         const docSnap = querySnapshot.docs[0];
//         return { id: docSnap.id, ...docSnap.data() } as Comentarios;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       throw new Error("Error getting comentario");
//     }
//   };