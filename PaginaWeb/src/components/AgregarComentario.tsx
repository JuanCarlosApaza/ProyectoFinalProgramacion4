import { useState } from "react";
import { addComentario } from "../services/ComentariosServices";
import { Comentarios } from "../Interface/Comentarios";
import Swal from "sweetalert2";
interface CrearComentarioProps {
    contentId:string;
    userId:string;
    usuario:string;
    accion: ()=>void;
}

const CrearComentario:React.FC<CrearComentarioProps> = ({contentId, userId,usuario,accion}) =>{
    const [comentario, setComentario] = useState<string>("");
    const validarComentario = ()=>{
        if(comentario.length < 5){
            alert("El comentario debe tener al menos 5 caracteres");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if(!validarComentario())return;
        try {
            const nuevoComentario :Omit<Comentarios, 'id'> = {
                usuario: usuario,
                comentario: comentario,
                fecha: new Date(),
                userId: userId,
                contentId: contentId
            };
            await addComentario(nuevoComentario);

            setComentario("");
            Swal.fire({
                title: "Gracias por comentar!",
                icon: "success",
                draggable: true
              });
            accion();
        } catch (error) {
            console.error("Error al crear el comentario: ", error);
            alert("Error al crear el comentario, intente nuevamente");}

    }
    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    className="p-2 border border-gray-300 rounded-lg resize-none"
                    rows={4}
                ></textarea>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Enviar Comentario</button>
            </form>
        </>
    )
    

}
export default CrearComentario;