import { MediaDetail,Model } from "../Interface/types"; // Asegúrate que este esté bien tipado
//parametros que puedes usar    popular	Las películas más populares actualmente
//top_rated	Películas con mejor puntuación
//upcoming	Películas que aún no se han estrenado
//now_playing	Películas que están en cartelera (cines actualmente)
//latest	Última película agregada (solo una, no es lista)
export const getMovies = async (parametro: string)=> {
    const ApiUrl=import.meta.env.VITE_REACT_API_URL_MOVIE;
    const ApiKey=import.meta.env.VITE_REACT_API_KEY_MOVIE;
    try {
        const response = await fetch(`${ApiUrl}/${parametro}?api_key=${ApiKey}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const data = await response.json();
        const Movie:Model[]=data.results.map((movie:any)=>({
          id: movie.id,
          title: movie.title || data.name,
          release_date:movie.release_date || data.first_air_date,
          summary: movie.overview,
          rating: movie.vote_average,
          img:movie.poster_path
        }))
  
        return Movie;
  
    } catch (error) {
        console.error(`Error obteniendo los datos:`, error);
        return [];
    }
};

export const getMovieDetails = async (id: string,parametros: string = "videos"): Promise<MediaDetail | null> => {
  const ApiUrl = import.meta.env.VITE_REACT_API_URL_MOVIE;
  const ApiKey = import.meta.env.VITE_REACT_API_KEY_MOVIE;

  try {
    const response = await fetch(
      `${ApiUrl}/${id}?api_key=${ApiKey}&append_to_response=${parametros}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Extraer trailer si se pidió videos
    const trailer = data.videos?.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );
    const detail: MediaDetail = {
      id: data.id,
      title: data.title || data.name,
      overview: data.overview,
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      category: data.media_type || "Pelicula",
      rating: data.vote_average,
      languages: data.spoken_languages?.map((l: any) => l.english_name) || [],
      release_date: data.release_date || data.first_air_date,
      duration: data.runtime ? `${data.runtime} min` : undefined,
      trailer_url: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined,
      genres: data.genres?.map((g: any) => g.name) || []
    };

    return detail;
  } catch (error) {
    console.error("Error obteniendo los datos:", error);
    return null;
  }
};
