import { useEffect, useState } from 'react';
import { getMovies, buscarNombrePeli } from '../services/ApiMovie';
import { Model } from '../Interface/types';
import Card from '../components/Card';
import { LoadingSpinner } from '../components/Loading';

const Peliculas = () => {
  const [movies, setMovies] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // valor de la busqueda búsqueda

  const cargarPeliculas = async () => {
    try {
      const data = await getMovies('popular');
      if (!data) return;
      setMovies(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarPeliculas = async () => {
    if (!searchTerm.trim()) return cargarPeliculas();
    setLoading(true);
    try {
      const data = await buscarNombrePeli(searchTerm);
      if (!data) return;// Evitar búsquedas vacías
      console.log("a",data)
      setMovies(data);
    } catch (error) {
      console.error("Error buscando películas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Películas Populares</h2>

      {/* Input para buscar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          onClick={buscarPeliculas}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <LoadingSpinner text="Cargando Películas" />
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
              page="Movies"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Peliculas;