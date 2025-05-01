import { useEffect, useState } from "react";
import { listarlibros } from "../services/ApiBooks";
import { Model } from "../Interface/types";
import { LoadingSpinner } from "../components/Loading";
import Card from "../components/Card";
import Navbar from "../utils/Navbar";
import { Search } from "lucide-react";
const LibroLeer = () => {
  const [titulo, setTitulo] = useState("Historia");
  const [query, setQuery] = useState("");
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

 

  return (
    <div>
      <Navbar>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl text-white font-bold mb-4">Libros</h1>

          <div className="flex mb-6 gap-2 justify-end">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              className="w-[60%] p-2 border rounded bg-white "
            />
            <button
              onClick={handleSearch}
              className="  px-4 py-2  border border-gray-300 rounded-full text-white hover:text-black hover:bg-white"
              >
            
              <Search/>
            </button>
          </div>
          {loading ? (
            <LoadingSpinner text="Cargando Juegos" />
          ) : Libros.length > 0 ? (
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
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center">
              <p className="text-red-400">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default LibroLeer;
