
import { useAuth } from "../context/AuthContext"; 

const Pruebas = () => {
    const { usuario } = useAuth(); 

    return (
        <>
            <h1>pruebas: {usuario?.displayName}</h1> 
        </>
    );
};

export default Pruebas;
