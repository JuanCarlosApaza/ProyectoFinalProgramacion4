import { useState } from "react";
import { PropGenres } from "../Interface/types";

const GenresBox = ({ genre, onSearch }: PropGenres) => {
  const [idGenre, setIdGenre] = useState<number>(0);


  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-6 bg-gradient-to-b from-black via-zinc-900 to-transparent">
      {/* Select de Géneros */}
      <select
        className="bg-zinc-800 text-white px-4 py-2 rounded-2xl shadow-md focus:outline-none"
        value={idGenre}
        onChange={(e) => {
          const selectedId = Number(e.target.value);
          setIdGenre(selectedId);
          onSearch(selectedId); // Llamar a la función
        }}
      >
        <option value="">Todos los géneros</option>
        {genre.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenresBox;