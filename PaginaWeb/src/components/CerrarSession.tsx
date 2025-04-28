import { signOut } from "firebase/auth";
import { auth } from "../Data/Firebase";  
import { useAuth } from "../context/AuthContext"; 
import Swal from "sweetalert2";
import {LogOut} from "lucide-react"

const LogoutButton = () => {
  const { usuario } = useAuth();

  const handleLogout = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a cerrar sesión, ${usuario?.displayName}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          Swal.fire({
            title: "¡Sesión cerrada!",
            text: "Cerraste la sesión correctamente",
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
  

  if (!usuario) {
    return null; 
  }

  return (
    <button
      onClick={handleLogout}
      className=" text-red-500 px-2 rounded-2xl"
    >
      <LogOut/>
    </button>
  );
};
export default LogoutButton;
