import { useEffect, useState } from "react";
import { listarlibros } from "../services/ApiBooks";
import { Model } from "../Interface/types";
import { LoadingSpinner } from "../components/Loading";
import Card from "../components/Card";
import Navbar from "../utils/Navbar";

const LibroLeer = () => {
  const [titulo, setTitulo] = useState("Historia");
  const [query, setQuery] = useState("Historia");
  const [Libros, setLibros] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarLibros = async () => {
    try {
      setLoading(true);
      const data = await listarlibros(titulo);
      if (!data) return;
      setLibros(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, [titulo]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setTitulo(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Navbar>
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Libros</h2>

          <div className="flex mb-6 gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar libros..."
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Buscar
            </button>
          </div>

          {loading ? (
            <LoadingSpinner text="Cargando libros..." />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Libros.map((libro) => (
                <Card
                  key={libro.key}
                  item={libro}
                  imageBaseUrl="https://covers.openlibrary.org/b/id/"
                  showOverview={true}
                  containerClass="custom-container"
                  aspectRatioClass="aspect-ratio-16/9"
                  page="Books"
                />
              ))}
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default LibroLeer;
