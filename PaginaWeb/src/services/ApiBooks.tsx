import { Model } from "../Interface/types";

export const getBooks = async (parametro: string)=> {
    const ApiUrl=import.meta.env.VITE_REACT_URL_BOOKS;
    try {
        const response = await fetch(`${ApiUrl}?${parametro}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const data = await response.json();
        const Book:Model[]=data.results.map((book:any)=>({
            id: book.id,
            title: book.title,
            summary: book.summaries?.[0] ?? undefined,
            rating: Math.min(5, Math.floor(book.download_count / 50000)), // Ejemplo: 1-5 estrellas basado en descargas
            img: book.formats["image/jpeg"]
        }))
  
        return Book;
  
    } catch (error) {
        console.error(`Error obteniendo los datos:`, error);
        return [];
    }
};
