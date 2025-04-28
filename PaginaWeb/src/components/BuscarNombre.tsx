import { useEffect, useState } from "react";

import { getMovies2 } from "../services/ApiMovie";
import Card from "./Card";
import { Buscar } from "../Interface/Buscar";
import { Model } from "../Interface/types";

const Busqueda:React.FC<Buscar> = ({categoria,nombre}) => {
  const [movies, setBuscar] = useState<Model[]>([]);
  const cargarDatos = async () => {
    try {
      if (categoria === "peliculas") {
        const data = await getMovies2(nombre);
        setBuscar(data);
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
      <h2 className="text-xl font-bold mb-4">Busqueda {categoria}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            item={movie}
            imageBaseUrl="https://image.tmdb.org/t/p/w500"
            showOverview={true}
            containerClass="custom-container"
            aspectRatioClass="aspect-ratio-16/9"
            page='Movies'
          />
        ))}
      </div>
    </div>
  );
};
export default Busqueda;
