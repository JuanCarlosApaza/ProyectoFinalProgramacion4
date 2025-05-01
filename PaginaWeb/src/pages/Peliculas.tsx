import { useEffect, useState } from "react";
import { getMovies,buscarNombrePeli,getGenres,searchGenres,} from "../services/ApiMovie";
import { Genre, Model } from "../Interface/types";
import Card from "../components/Card";
import { LoadingSpinner } from "../components/Loading";
import GenresBox from "../components/GenresBox";
import Navbar from "../utils/Navbar";
import { Search } from "lucide-react";

const Peliculas = () => {
  const [movies, setMovies] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // valor de la busqueda búsqueda
  const [genres, setGenres] = useState<Genre[]>([]);

  const cargarPeliculas = async (idgenre?: number) => {
    try {
      let data: Model[] = [];
      if (idgenre) {
        data = await searchGenres(idgenre);
        if (!data) return;
      } else {
        data = await getMovies("popular");
        if (!data) return;
      }
      setMovies(data);
      const genre = await getGenres();
      if (!genre) return;
      setGenres(genre);
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
      if (!data) return; // Evitar búsquedas vacías

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
    <>
      <Navbar>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <GenresBox genre={genres} onSearch={cargarPeliculas} />
            <div className="mb-4 flex gap-2 w-[60%]  ">
              <input
                type="text"
                placeholder="Buscar películas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full bg-white "
              />
              <button
                onClick={buscarPeliculas}
                className="  px-4 py-2  border border-gray-300 rounded-full text-white hover:text-black bg-white"
              >
                <Search/>
              </button>
            </div>
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
      </Navbar>
    </>
  );
};

export default Peliculas;
