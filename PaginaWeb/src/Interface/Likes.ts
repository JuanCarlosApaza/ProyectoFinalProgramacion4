export interface Likes {
    id : string;
    userId : string;
    contentId : string;
    tipo? : string;
    estado:boolean;
    fecha? : Date;
}