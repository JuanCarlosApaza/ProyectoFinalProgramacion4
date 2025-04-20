import { useEffect, useState } from 'react';
import { getMovies } from '../services/ApiMovie';
import { Movie } from '../interfaces/Movie';
import Card from '../components/Card';

const Peliculas=() =>{
  const [movies, setMovies] = useState<Movie[]>([]);

  const cargarPeliculas = async () => {
    try {
      const data = await getMovies('popular');
      setMovies(data.results); 
      console.log(data.results)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  return (
    <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Películas Populares</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
                <Card
                key={movie.id} // Asegúrate de pasar una key única
                item={movie}  // Pasas un solo objeto `Movie` aquí
                imageBaseUrl="https://image.tmdb.org/t/p/w500"
                showOverview={true}
                containerClass="custom-container"
                aspectRatioClass="aspect-ratio-16/9"
            />
            ))}
        </div>
      </div>
  );
}

export default Peliculas;