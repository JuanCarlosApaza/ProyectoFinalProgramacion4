import { Link } from "react-router-dom";

const Inicio = () =>{

    return(
        <>
        <h1>Inicio</h1>
        <Link to="/IA">Inteligencia Artificial</Link>
        <Link to="/Movies">Peliculas</Link>
        <Link to="/Games">Juegos</Link>
        <Link to="/Books">Libros</Link>
        </>
    )
}
export default Inicio;