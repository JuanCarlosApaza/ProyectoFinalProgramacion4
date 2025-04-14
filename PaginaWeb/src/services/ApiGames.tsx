import { Model } from "../Interface/types";

export const getGames = async (): Promise<Model[] | undefined> => {
  const accessToken = import.meta.env.VITE_REACT_ACCESSTOKEN;
  const clientId = import.meta.env.VITE_REACT_CLIENTID;

  try {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.igdb.com/v4/games',
      {
        method: "POST",
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body:
          "fields name, summary, cover.image_id, first_release_date, rating; sort rating desc; limit 80;"
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching games: " + response.statusText);
    }

    const data = await response.json();

    const games: Model[] = data.map((game: any) => ({
      id: game.id,
      title: game.name,
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Fecha desconocida",
      summary: game.summary,
      rating: game.rating,
      img: game.cover
        ? `${game.cover.image_id}.jpg`
        : "",
    }));

    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};
