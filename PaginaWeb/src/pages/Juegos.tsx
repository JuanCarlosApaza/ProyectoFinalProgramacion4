import { useState, useEffect } from "react";
import { getGames, getGamesName,searchGenresG,getGenres } from "../services/ApiGames";
import { Genre, Model } from "../Interface/types";
import Card from "../components/Card";
import { LoadingSpinner } from "../components/Loading";
import Navbar from "../utils/Navbar";
import GenresBox from "../components/GenresBox";


const Juegos = () => {
  const [games, setGames] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<Genre[]>([])

  const cargarJuegos = async (idgenre?:number) => {
    try {
      const fetchedGenres =await getGenres();
      console.log(fetchedGenres)
      if (!fetchedGenres ) return;
      setGenres(fetchedGenres )
      let data: Model[] = [];
      if(idgenre){
        data = (await searchGenresG(idgenre)) || []
      }else{
        data = (await getGames()) || []
        if (!data) return;
      }

      setGames(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const buscarJuegos = async () => {

    if (!searchTerm.trim()) return cargarJuegos();
      setLoading(true);
      try {
        const data = await getGamesName(searchTerm);
        if (!data) return;// Evitar búsquedas vacías
        console.log("a",data)
        setGames(data);
      } catch (error) {
        console.error("Error buscando películas:", error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    cargarJuegos();
  }, []);

  return (

    <div>
      <Navbar>
        

    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Juegos Populares</h2>
      <GenresBox genre={genres} onSearch={cargarJuegos} />
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          onClick={buscarJuegos}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>


        {loading ? (
          <LoadingSpinner text="Cargando Juegos" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {games.map((game) => (
              <Card
                key={game.id}
                item={game}
                imageBaseUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/"
                showOverview={true}
                containerClass="custom-container"
                aspectRatioClass="aspect-ratio-16/9"
                page="Games"
              />
            ))}
          </div>
        )}
        </div>
      
      </Navbar>
    </div>
  );
};

export default Juegos;
