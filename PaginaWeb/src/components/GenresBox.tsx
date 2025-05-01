import { useState } from "react";
import { PropGenres } from "../Interface/types";

const GenresBox = ({ genre, onSearch }: PropGenres) => {
  const [idGenre, setIdGenre] = useState<number>(0);

  return (
    <div >
      {/* Select de Géneros */}
      <select
        className=" text-white px-6 py-2 rounded-xl shadow-md focus:outline-none bg-black"
        value={idGenre}
        onChange={(e) => {
          const selectedId = Number(e.target.value);
          setIdGenre(selectedId);
          onSearch(selectedId); // Llamar a la función
        }}
      >
        <option value="" className="p-4 text-white">Todos los géneros</option>
        {genre.map((genre) => (
          <option className="text-white " key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenresBox;