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

export const getMovieDetails = async (id: string, parametros: string = "videos"): Promise<MediaDetail | null> => {
  const ApiUrl = import.meta.env.VITE_REACT_API_URL_MOVIE;
  const ApiKey = import.meta.env.VITE_REACT_API_KEY_MOVIE;

  try {
    const response = await fetch(
      `${ApiUrl}/${id}?api_key=${ApiKey}&append_to_response=${parametros}`
    );
    const providersRes = await fetch(
      `${ApiUrl}/${id}/watch/providers?api_key=${ApiKey}`
    );
    let platformsE: string[] = [];  // Aquí solo guardamos los nombres de las plataformas
    
    if (providersRes.ok) {
      const providersData = await providersRes.json();
      const esData = providersData.results?.ES; // O cambia "ES" por tu país
    
      if (esData) {
        // Función para extraer y mapear solo nombres de proveedores
        const extractPlatforms = (arr?: any[]) =>
          arr?.map((p) => p.provider_name) || [];
    
        const flatrate = extractPlatforms(esData.flatrate);
        const buy = extractPlatforms(esData.buy);
        const rent = extractPlatforms(esData.rent);
    
        // Unir todas las plataformas y eliminar duplicados
        platformsE = [...new Set([...flatrate, ...buy, ...rent])];
      }
    }

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

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
      genres: data.genres?.map((g: any) => g.name) || [],
      platforms: platformsE, 
    };

    return detail;
  } catch (error) {
    console.error("Error obteniendo los datos:", error);
    return null;
  }
};

export const buscarNombrePeli= async (nombre:string)=>{
  const ApiUrl=import.meta.env.VITE_REACT_API_URL_MOVIE2;
  const ApiKey=import.meta.env.VITE_REACT_API_KEY_MOVIE;
  try {
    const response = await fetch(`${ApiUrl}?api_key=${ApiKey}&query=${nombre}`);
    
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
}