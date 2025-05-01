import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { MediaDetail } from "../Interface/types";
import { getMovieDetails } from "../services/ApiMovie";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "./Loading";
import { getGameById } from "../services/ApiGames";
import { librosdetalles } from "../services/ApiBooks";
import Navbar from "../utils/Navbar";
import { useAuth } from "../context/AuthContext";
import MostrarComentarios from "./Comentarios";
import Likes from "./ListarLikes";
interface props {
  pagina: string;
  baseImg?: string;
}
export function MediaDetailView({ pagina, baseImg }: props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<MediaDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { usuario } = useAuth();
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const fetchDetailsMovie = async () => {
    if (id) {
      try {
        const movie = await getMovieDetails(
          id,
          "videos,credits,images,recommendations"
        );
        console.log(movie);
        setDetail(movie);
        if (movie) {
          const id = movie.trailer_url ? extractYoutubeId(movie.trailer_url) : null;
          setTrailerId(id);
        }
        
      } catch (err) {
        setError("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    }
  };
  const fetchDetailsBook = async () => {
    if (id) {
      try {
        const movie = await librosdetalles(id);
        console.log(movie);
        setDetail(movie);
      } catch (err) {
        setError("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    }
  };
  const fetchDetailsGames = async () => {
    if (id) {
      try {
        const game = await getGameById(id);
        console.log("juego", game);
        if (!game) return;
        setDetail(game);
      } catch (err) {
        setError("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (pagina === "Juegos") fetchDetailsGames();
    else if (pagina === "Libros") fetchDetailsBook();
    else fetchDetailsMovie();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Cargando...." />;
  }

  if (error || !detail) {
    return (
      <div className="w-full h-[300px] bg-black/20 flex items-center justify-center">
        <p className="text-red-400">
          {error || "No se pudo cargar la información"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Navbar>
        <div className="relative w-full">
          <div className="relative w-full h-[701px] overflow-hidden">
            {detail.backdrop_path ? (
              <img
                src={
                  baseImg
                    ? baseImg + detail.backdrop_path
                    : detail.backdrop_path || "/placeholder.svg"
                }
                alt={detail.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-black to-zinc-800" />
            )}

            {/* Overlay oscuro para mejorar la legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

            {/* Contenido principal */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    {detail.title}
                  </h1>
                  <p className="text-lg text-white/90 mb-6 max-w-3xl">
                    {detail.overview}
                  </p>

                  {detail.trailer_url && (
                    <button
                      onClick={() => setShowTrailer(true)} // Cambiamos el estado en lugar de abrir una nueva pestaña
                      className="inline-flex items-center px-4 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition"
                    >
                      <Play className="mr-2 h-5 w-5" /> VER TRAILER
                    </button>
                  )}
                  {detail.ocaid && (
                    <a
                      href={`https://archive.org/details/${detail.ocaid}?view=theater`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "5px",
                      }}
                    >
                      📖 Leer online
                    </a>
                  )}
                </div>

                <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                    Detalles
                  </h2>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-white/70">Categoría:</dt>
                      <dd className="text-white font-medium">
                        {detail.category}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/70">Calificación:</dt>
                      <dd className="text-white font-medium">
                        {detail.rating ? detail.rating.toFixed(2) : "N/A"}/10.00
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/70">Lenguajes:</dt>
                      <dd className="text-white font-medium">
                        {detail.languages ? detail.languages.join(", ") : "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-white/70">Estreno:</dt>
                      <dd className="text-white font-medium">
                        {detail.release_date}
                      </dd>
                    </div>
                    {detail.duration && (
                      <div>
                        <dt className="text-white/70">Duración:</dt>
                        <dd className="text-white font-medium">
                          {detail.duration}
                        </dd>
                      </div>
                    )}
                    {detail.genres && (
                      <div>
                        <dt className="text-white/70">Géneros:</dt>
                        <dd className="text-white font-medium">
                          {detail.genres.join(", ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* Video de Youtube */}
          {detail && trailerId && trailerId.length === 11 && showTrailer && (
            <div className="w-full bg-black py-8">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-white mb-6">Tráiler</h2>
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe
                    className="w-full h-[500px]"
                    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
          <div>
            
            <MostrarComentarios
              contentid={detail.id ?? "0"}
              user={usuario?.displayName ?? "anonimo"}
              userId={usuario?.uid ?? "0"}
            />
          </div>
        </div>
      </Navbar>
    </div>
  );
}
