import { Link } from "react-router-dom";

const Inicio = () =>{

    return(
        <>
        <h1>Inicio</h1>
        <Link to="/IA">Inteligencia Artificial</Link>
        <Link to="/Peliculas">Peliculas</Link>
        <Link to="/Pruebas">Pruebas</Link>

        </>
    )
}
export default Inicio;