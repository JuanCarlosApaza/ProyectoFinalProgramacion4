import { useState, useEffect } from "react";
import { Model } from "../Interface/types";
import Card from "../components/Card";
import { LoadingSpinner } from "../components/Loading";
import { getBooks } from "../services/ApiBooks";

const Libros = () => {
  const [books, setBooks] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarLibros = async () => {
    try {
      const data = await getBooks("sort=download_count");
      if (!data) return;
      setBooks(data);
      console.log("datos:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Juegos Populares</h2>

      {loading ? (
        <LoadingSpinner text="Cargando Libros"/>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {books.map((book) => (
            <Card
              key={book.id}
              item={book}
              showOverview={true}
              containerClass="custom-container"
              aspectRatioClass="aspect-ratio-16/9"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Libros;