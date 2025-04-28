import {  useState } from "react";
import { Star } from "lucide-react";
import { Estrellas } from "../Interface/Estrellas";
import { addEstrella } from "../services/Estrellas";
import Swal from "sweetalert2";

interface EstrellaProps {
  userId: string;
  contenido: string;
  categoria: string;
  enviado?: (valor: boolean) => void; 
}

const Stars: React.FC<EstrellaProps> = ({ userId, contenido , enviado ,categoria}) => {
  const [puntuacion, setPuntuacion] = useState(0);
  const opciones = [
    { valor: 1, icono: Star },
    { valor: 2, icono: Star },
    { valor: 3, icono: Star },
    { valor: 4, icono: Star },
    { valor: 5, icono: Star },
  ];
  const handleClick = async (valor: number) => {
    setPuntuacion(valor); 
    try {
      const estrella: Omit<Estrellas, "id"> = {
        categoria: categoria,
        userId: userId,
        contenido: contenido,
        contador: valor,
        date: new Date(),
      };
      await addEstrella(estrella); 
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gracias por tu calificación",
        showConfirmButton: false,
        timer: 1500
      });

      setPuntuacion(0);
      if (enviado) {
        enviado(false);
      }
    } catch (error) {
      console.error("Error al agregar la estrella: ", error);
    }
  };

  return (
    <div className=" flex flex-row justify-center items-center gap-2 p-4 rounded-lg">
    
      {
        opciones.map((opcion: any) => {
          const Icono = opcion.icono;
          return (
            <button
              key={opcion.valor}
              onClick={() => handleClick(opcion.valor)}
              className="hover:scale-120 transition-all duration-300"
            >
              <Icono
                size={40}
                className={
                  opcion.valor <= puntuacion ? "text-yellow-400" : "text-gray-500"
                }
                fill={opcion.valor <= puntuacion ? "#facc15" : "none"}
              />
            </button>
          );
        })
      }
    </div>
  );
};

export default Stars;
