export type Movie = {
  id: number;
  title: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
  rating?:number;
};
  
export interface MyComponentProps {
    item: Movie;
    imageBaseUrl: string;
    showOverview: boolean;
    containerClass?: string;
    aspectRatioClass?: string;
};

export interface MediaDetail {
    id: number
    title: string
    overview: string
    backdrop_path?: string
    poster_path?: string
    category: string
    rating: number
    languages: string[]
    release_date: string
    duration?: string
    trailer_url?: string
    genres?:string[]
  }
  