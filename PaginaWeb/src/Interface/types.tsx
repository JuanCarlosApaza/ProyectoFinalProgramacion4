export type Model={
  id?: string;
  title: string;
  release_date?: string;
  summary?: string;
  rating?:number;
  img?:string
  autor?:string,
  key?:string,
}
export interface MyComponentProps {
    item: Model;
    imageBaseUrl?: string;
    showOverview: boolean;
    containerClass?: string;
    aspectRatioClass?: string;
    page?:string,
};

export interface MediaDetail {
    id?: string
    title?: string
    overview?: string
    backdrop_path?: string
    poster_path?: string
    category?: string
    rating?: number
    languages?: string[]
    release_date?: string
    duration?: string
    trailer_url?: string
    genres?:string[]
    platforms?:string[]
    ocaid?:string
}
  