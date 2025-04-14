import { useEffect, useState } from 'react';
import { getMovies } from '../services/ApiMovie';
import { Model } from '../Interface/types';
import Card from '../components/Card';
import { LoadingSpinner } from '../components/Loading';

const Peliculas=() =>{
  const [movies, setMovies] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarPeliculas = async () => {
    try {
      const data = await getMovies('popular');
      if(!data) return
      setMovies(data); 
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  return (
    <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Películas Populares</h2>
        {loading ? (
        <LoadingSpinner text="Cargando Juegos"/>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              item={movie}
              imageBaseUrl="https://image.tmdb.org/t/p/w500"
              showOverview={true}
              containerClass="custom-container"
              aspectRatioClass="aspect-ratio-16/9"
            />
          ))}
        </div>
      )}
      </div>
  );
}

export default Peliculas;