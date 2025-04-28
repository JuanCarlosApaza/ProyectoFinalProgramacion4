
import { Genre, MediaDetail,Model } from "../Interface/types"; 


export const getMovies2 = async (parametro: string) => {
  const ApiUrl = import.meta.env.VITE_REACT_API_URL_PELICULAS2; 
  const ApiKey = import.meta.env.VITE_REACT_API_KEY_MOVIE;

  try {
    const response = await fetch(`${ApiUrl}?query=${parametro}&api_key=${ApiKey}&language=es-ES`);

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



export const getMovies = async (parametro: string)=> {
    const ApiUrl=import.meta.env.VITE_REACT_API_URL_MOVIE;
    const Token=import.meta.env.VITE_REACT_API_TOKEN;
    try {
      const response = await fetch(`${ApiUrl}/movie/${parametro}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json;charset=utf-8"
        }
      });
        
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
  const Token=import.meta.env.VITE_REACT_API_TOKEN;

  try {
    const response = await fetch(`${ApiUrl}/movie/${id}?append_to_response=${parametros}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
    const providersRes = await fetch(
      `${ApiUrl}/movie/${id}/watch/providers`,{
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json;charset=utf-8"
        }
      }
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
  const ApiUrl=import.meta.env.VITE_REACT_API_URL_MOVIE;
  const Token=import.meta.env.VITE_REACT_API_TOKEN;
  try {
    const response = await fetch(`${ApiUrl}/search/movie?query=${nombre}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
    
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

export const getGenres=async()=>{
  const ApiUrl=import.meta.env.VITE_REACT_API_URL_MOVIE;
  const Token=import.meta.env.VITE_REACT_API_TOKEN;
  try{
    const response = await fetch(`${ApiUrl}/genre/movie/list?language=es-ES`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);}
      const data = await response.json();
      const genres: Genre[] = data.genres.map((g: any) => ({
        id: g.id,
        name: g.name,
      }));
    return genres;
  }catch(error){
    console.error(`Error obteniendo los generos:`, error);
    return [];
  }
}

export const searchGenres=async(id:number)=>{
  const ApiUrl=import.meta.env.VITE_REACT_API_URL_MOVIE;
  const Token=import.meta.env.VITE_REACT_API_TOKEN;
  try{
    const response = await fetch(`${ApiUrl}/discover/movie?language=es-ES&with_genres=${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
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
  }catch(error){
    console.error(`Error obteniendo los generos:`, error);
    return [];
  }
}
