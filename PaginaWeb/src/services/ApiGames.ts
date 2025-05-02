import { Genre, MediaDetail, Model } from "../Interface/types";

export const getGames = async (): Promise<Model[] | undefined> => {

  const apiUrl = import.meta.env.VITE_REACT_API_URL_GAMES;

  try {
    const response = await fetch(`${apiUrl}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "fields name, summary, cover.image_id, first_release_date, rating; sort rating desc; limit 80;",
      }),
    });

    if (!response.ok) {
      throw new Error("Error fetching games: " + response.statusText);
    }

    const data = await response.json();
    console.log("Juego", data);
    const games: Model[] = data.map((game: any) => ({
      id: game.id,
      title: game.name,
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Fecha desconocida",
      summary: game.summary,
      rating: game.rating,
      img: game.cover ? `${game.cover.image_id}.jpg` : "",
    }));
    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

export const getGameById = async (
  gameId: string
): Promise<MediaDetail | undefined> => {

  const apiUrl = import.meta.env.VITE_REACT_API_URL_GAMES;

  try {
    const response = await fetch(`${apiUrl}/games`, {
      method: "POST",
      headers: {
       
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        query: `
          fields name, summary, cover.image_id, first_release_date, rating, genres.name, videos.video_id, 
          screenshots.image_id, artworks.image_id, platforms.name;
          where id = ${gameId};
        `})
    });

    if (!response.ok) throw new Error("Error fetching game detail");

    const [game] = await response.json(); // solo un juego

    const mediaDetail: MediaDetail = {
      id: game.id,
      title: game.name,
      overview: game.summary ?? "Sin descripción",
      poster_path: game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
        : undefined,
      backdrop_path: game.artworks?.[0]?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.artworks[0].image_id}.jpg`
        : game.screenshots?.[0]?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.screenshots[0].image_id}.jpg`
        : undefined,
      rating: Math.round(game.rating ?? 0),
      category: "game",
      languages: ["en"],
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Desconocida",
      duration: undefined,
      trailer_url: game.videos?.[0]?.video_id
        ? `https://www.youtube.com/watch?v=${game.videos[0].video_id}`
        : undefined,
      genres: game.genres?.map((genre: any) => genre.name) ?? [],
      platforms: game.platforms?.map((platform: any) => platform.name) ?? [],
    };

    return mediaDetail;
  } catch (error) {
    console.error("Error fetching game by ID:", error);
  }
};

export const getGamesName = async (
  nombre: string
): Promise<Model[] | undefined> => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL_GAMES;

  try {
    const response = await fetch(`${apiUrl}/games`, {
      method: "POST",
      headers: {
        "Accept": "application/json", // Este puede quedar
        "Content-Type": "application/json", // CORREGIDO
      },
      body: JSON.stringify({
        query: `search "${nombre}"; fields name, summary, cover.image_id, first_release_date, rating; limit 5;`,
      }), // CORREGIDO
    });

    if (!response.ok) {
      throw new Error("Error fetching games: " + response.statusText);
    }

    const data = await response.json();
    console.log("Juego", data);

    const games: Model[] = data.map((game: any) => ({
      id: game.id,
      title: game.name,
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Fecha desconocida",
      summary: game.summary,
      rating: game.rating,
      img: game.cover ? `${game.cover.image_id}.jpg` : "",
    }));

    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};


export const getGenres = async () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL_GAMES;

  try {
    const response = await fetch(`${apiUrl}/genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        query: "fields id, name; limit 30;", 
      }),
    });

    if (!response.ok) {
      throw new Error("Error obteniendo los géneros: " + response.statusText);
    }

    const data = await response.json();

    const genres: Genre[] = data.map((g: any) => ({
      id: g.id,
      name: g.name,
    }));

    return genres;
  } catch (error) {
    console.error("Error en la función getGenres:", error);
    return [];
  }
};


export const searchGenresG = async (
  idGenero: number
): Promise<Model[] | undefined> => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL_GAMES;

  try {
    const response = await fetch(`${apiUrl}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        query: `fields name, summary, cover.image_id, first_release_date, rating; where genres = ${idGenero}; limit 20;`,
      }), 
    });

    if (!response.ok) {
      throw new Error("Error obteniendo juegos: " + response.statusText);
    }

    const data = await response.json();
    console.log("Juegos", data);

    const games: Model[] = data.map((game: any) => ({
      id: game.id,
      title: game.name,
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Fecha desconocida",
      summary: game.summary,
      rating: game.rating,
      img: game.cover ? `${game.cover.image_id}.jpg` : "",
    }));

    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

