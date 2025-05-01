import { useEffect, useState } from "react";

import { getMovies2 } from "../services/ApiMovie";
import Card from "./Card";
import { Buscar } from "../Interface/Buscar";
import { Model } from "../Interface/types";
import { listarlibros } from "../services/ApiBooks";
import { getGamesName } from "../services/ApiGames";

const Busqueda:React.FC<Buscar> = ({categoria,nombre}) => {
  const [movies, setBuscar] = useState<Model[]>([]);
  const [imagen,SetImagen] = useState<string>("");
  const [enlace, setEnlace] = useState<string>("");
  const cargarDatos = async () => {
    try {
      if (categoria === "peliculas") {
        const data = await getMovies2(nombre);
        setBuscar(data);
        SetImagen("https://image.tmdb.org/t/p/w500");
        setEnlace("Movies");
        console.log("peliculas",data)
      }
      else if (categoria === "libros") {
        const data = await listarlibros(nombre);
        setBuscar(data);
        SetImagen("https://covers.openlibrary.org/b/id/");
        setEnlace("Books")
        console.log("libros",data)

      }
      else if (categoria === "juegos") {
        const data = await getGamesName(nombre);
        if (!data) return;
        setBuscar(data);
        SetImagen("https://images.igdb.com/igdb/image/upload/t_cover_big/");
        setEnlace("Games")
        console.log("juegos",data)

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    cargarDatos();
  }, [nombre, categoria]);
  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white"> {categoria}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            item={movie}
            imageBaseUrl={imagen}
            showOverview={true}
            containerClass="custom-container"
            aspectRatioClass="aspect-ratio-16/9"
            page={enlace}
          />
        ))}
      </div>
    </div>
  );
};
export default Busqueda;
