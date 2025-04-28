import { useState, useEffect } from "react";
import { getGames } from "../services/ApiGames";
import { Model } from "../Interface/types";
import Card from "../components/Card";
import { LoadingSpinner } from "../components/Loading";
import Navbar from "../utils/Navbar";

const Juegos = () => {
  const [games, setGames] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarJuegos = async () => {
    try {
      const data = await getGames();
      if (!data) return;
      setGames(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <h2 className="text-xl font-bold mb-4 text-white">Juegos Populares</h2>

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
