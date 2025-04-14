import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import { MediaDetail } from "../Interface/types"
import { getMovieDetails } from "../services/ApiMovie"
import { useParams } from "react-router-dom"

export function MediaDetailView() {
 const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<MediaDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchDetails = async () => {
    if(id){
        try {
            const movie = await getMovieDetails(id, "videos,credits,images,recommendations")
            setDetail(movie)
          } catch (err) {
            setError("No se pudo cargar la información")
          } finally {
            setLoading(false)
          }
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-black/20 animate-pulse flex items-center justify-center">
        <p className="text-white/70">Cargando...</p>
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="w-full h-[300px] bg-black/20 flex items-center justify-center">
        <p className="text-red-400">{error || "No se pudo cargar la información"}</p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Hero Banner con imagen de fondo */}
      <div className="relative w-full h-[701px] overflow-hidden">
        {detail.backdrop_path ? (
          <img
            src={"https://image.tmdb.org/t/p/w500"+detail.backdrop_path || "/placeholder.svg"}
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
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{detail.title}</h1>
              <p className="text-lg text-white/90 mb-6 max-w-3xl">{detail.overview}</p>

              {detail.trailer_url && (
                <button
                  onClick={() => window.open(detail.trailer_url, "_blank")}
                  className="inline-flex items-center px-4 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition"
                >
                  <Play className="mr-2 h-5 w-5" /> VER TRAILER
                </button>
              )}
            </div>

            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">Detalles</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-white/70">Categoría:</dt>
                  <dd className="text-white font-medium">{detail.category}</dd>
                </div>
                <div>
                  <dt className="text-white/70">Calificación:</dt>
                  <dd className="text-white font-medium">{detail.rating.toFixed(2)}/10.00</dd>
                </div>
                <div>
                  <dt className="text-white/70">Lenguajes:</dt>
                  <dd className="text-white font-medium">{detail.languages.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-white/70">Estreno:</dt>
                  <dd className="text-white font-medium">{detail.release_date}</dd>
                </div>
                {detail.duration && (
                  <div>
                    <dt className="text-white/70">Duración:</dt>
                    <dd className="text-white font-medium">{detail.duration}</dd>
                  </div>
                )}
                {detail.genres&&(
                  <div>
                    <dt className="text-white/70">Géneros:</dt>
                    <dd className="text-white font-medium">{detail.genres.join(", ")}</dd>
                  </div>                
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}