import { MediaDetail, Model } from "../Interface/types";


export const listarlibros = async (parametro: string): Promise<Model[]> => {
  const apiUrl = import.meta.env.VITE_REACT_URL_LIBROS;
  try {
    const response = await fetch(
      `${apiUrl}search.json?q=${encodeURIComponent(
        parametro
      )}&fields=key,title,author_name,cover_i,editions,editions.key,editions.title,editions.language,editions.ebook_access,editions.ocaid`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const librosfiltrados: Model[] = [];

    for (const doc of data.docs) {
      const ediciones = doc.editions?.docs || [];

      const edicionesespanol = ediciones.filter(
        (edi: any) =>
          edi.language?.includes("spa") &&
          (edi.ebook_access === "public" || edi.ebook_access === "borrowable")
      );

      for (const edicion of edicionesespanol) {
        librosfiltrados.push({
          title: edicion.title,
          img: `${doc.cover_i}${"-L.jpg"}`,
          autor: doc.author_name?.join(", "),
          summary:
            "libro que se puede leer gratis en nuestra web algo generico el texto pero mejorara con IA, se mejorara",
          id: edicion.key?.replace("/books/", ""),
        });
      }
    }

    return librosfiltrados;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
export const librosdetalles = async (
  id: string
): Promise<MediaDetail | null> => {
  const apiUrl = import.meta.env.VITE_REACT_URL_LIBROS;
  try {
    const response = await fetch(`${apiUrl}books/${id}.json`);
    const data = await response.json();
    const detalles: MediaDetail = {
      id: data.key,
      ocaid: data.ocaid,
      title: data.title,
      overview: data.subtitle,
      rating: data.revision,
      release_date: data.publish_date,
      languages: data.lenguages,
      backdrop_path: `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
    };
    console.log("detalles", detalles);
    return detalles;
  } catch (error) {
    console.log("error ni modo", error);
    return null;
  }
};
