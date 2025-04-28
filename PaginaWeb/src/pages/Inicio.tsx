import { Link } from "react-router-dom"; 

const Inicio = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 w-full min-h-screen">
                <div className="min-h-screen flex flex-col md:flex-row bg-transparent text-white overflow-x-hidden">
                    {/* Columna izquierda */}
                    <div className="w-full md:w-[50%] flex flex-col items-center md:items-start justify-start p-4 sm:p-6 md:p-14 md:ml-10 lg:ml-20 text-center md:text-left">
                        <div className="max-w-2xl w-full mt-2 md:mt-6">
                            <div className="flex items-center justify-center md:justify-start">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-none md:mb-4">
                                    WIKIGEEK
                                </h1>
                                <img 
                                    src="/Inicio/logo2.png" 
                                    alt="Logo Wikigeek" 
                                    className="h-10 sm:h-14 md:h-20 lg:h-24 xl:h-32 ml-2"
                                />
                            </div>
                            <h1 className="text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-none mb-0 font-exo">
                                El catálogo más <br className="hidden xs:block" />
                                grande de <br className="hidden xs:block" />
                                entretenimiento
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-4 mb-6 sm:mb-8 md:text-left">
                                Te damos la bienvenida al catálogo de juegos, películas y libros más grande de toda la web, esto es WikiGeek
                            </p>
                        </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="w-full md:w-[40%] flex flex-col items-center p-3 sm:p-6 md:p-8 lg:p-10 mt-15">
                        {/* Contenedor de imágenes*/}
                        <div className="relative w-full max-w-md h-auto md:min-h-[26rem] flex md:block items-center justify-center gap-4 md:gap-0 mb-2 sm:mb-3 md:mb-4">
                            {/* Celular apilado vertical */}
                            <div className="flex flex-col md:hidden gap-3 sm:gap-4 w-full">
                                <Link to="/IA" className="w-full">
                                    <img 
                                        src="/Inicio/img3.jpg" 
                                        alt="imagen3" 
                                        className="w-full h-auto max-h-80 sm:max-h-64 object-cover rounded-lg shadow-xl"
                                    />
                                </Link>
                                <Link to="/IA" className="w-full">
                                    <img 
                                        src="/Inicio/img1.jpg" 
                                        alt="imagen1" 
                                        className="w-full h-auto max-h-80 sm:max-h-64 object-cover rounded-lg shadow-xl"
                                    />
                                </Link>
                                <Link to="/IA" className="w-full">
                                    <img 
                                        src="/Inicio/img2.jpg" 
                                        alt="imagen2" 
                                        className="w-full h-auto max-h-80 sm:max-h-64 object-cover rounded-lg shadow-xl"
                                    />
                                </Link>
                            </div>

                            {/* imágenes superpuestas */}
                            <div className="hidden md:block relative w-full h-full min-h-[26rem]">
                                <Link to="/IA" className="absolute left-0 top-0 w-[45%] max-w-[240px] z-20 hover:z-50 transition-all duration-300">
                                    <img 
                                        src="/Inicio/img3.jpg" 
                                        alt="imagen3" 
                                        className="w-full h-auto max-h-[22rem] object-cover rounded-lg shadow-xl 
                                            hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                                    />
                                </Link>
                                <Link to="/IA" className="absolute left-1/2 top-8 transform -translate-x-1/2 w-[50%] max-w-[260px] z-30 hover:z-50 transition-all duration-300">
                                    <img 
                                        src="/Inicio/img1.jpg" 
                                        alt="imagen1" 
                                        className="w-full h-auto max-h-[24rem] object-cover rounded-lg shadow-xl 
                                            hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                                    />
                                </Link>
                                <Link to="/IA" className="absolute right-0 top-16 w-[45%] max-w-[240px] z-10 hover:z-50 transition-all duration-300">
                                    <img 
                                        src="/Inicio/img2.jpg" 
                                        alt="imagen2" 
                                        className="w-full h-auto max-h-[20rem] object-cover rounded-lg shadow-xl 
                                            hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Botón */}
                        <div className="w-full text-center mt-0">
                            <Link
                                to="/login"
                                className="inline-block px-6 sm:px-8 py-2 sm:py-2.5 bg-transparent text-white text-sm sm:text-base md:text-lg font-bold rounded-xl border-2 border-white hover:bg-gray-900 transition-colors duration-300"
                            >
                                IR AL INICIO
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>
                <div className="min-h-screen flex flex-col md:flex-row-reverse bg-transparent text-white overflow-x-hidden">
                    {/* Columna derecha*/}
                    <div className="w-full md:w-[50%] flex flex-col items-center md:items-end justify-start p-4 sm:p-6 md:p-14 md:mr-10 lg:mr-20 text-center md:text-right">
                        <div className="max-w-2xl w-full mt-2 md:mt-6">
                            <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-none mb-0 font-exo md:text-right">
                                Busca la <br className="hidden xs:block" />
                                información <br className="hidden xs:block" />
                                de tus juegos, películas o libros <br className="hidden xs:block" />
                                favoritos
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-4 mb-6 sm:mb-8 md:text-right">
                                Seleccione la categoría de su preferencia  con <br/> nuestros botones y filtre por sus géneros favoritos para <br/> encontrar el material que guste
                            </p>
                        </div>
                    </div>

                    {/* Columna izquierda*/}
                    <div className="w-full md:w-[40%] flex flex-col items-center p-3 sm:p-6 md:p-8 lg:p-10 mt-15">
                        {/* Contenedor de imágenes*/}
                        <div className="relative w-full max-w-md h-auto md:min-h-[26rem] flex md:block items-center justify-center gap-4 md:gap-0 mb-2 sm:mb-3 md:mb-4">
                            {/* Celular apilado vertical */}
                            <div className="flex flex-col md:hidden gap-3 sm:gap-4 w-full">
                                <Link to="/IA" className="w-full">
                                    <img 
                                        src="/Inicio/img6.jpg" 
                                        alt="imagen3" 
                                        className="w-full h-auto max-h-80 sm:max-h-64 object-cover rounded-lg shadow-xl"
                                    />
                                </Link>
                                <Link to="/IA" className="w-full">
                                    <img 
                                        src="/Inicio/img5.jpg" 
                                        alt="imagen1" 
                                        className="w-full h-auto max-h-80 sm:max-h-64 object-cover rounded-lg shadow-xl"
                                    />
                                </Link>
                                <Link to="/IA" className="w-full">
                                    <img 
                                        src="/Inicio/img4.jpg" 
                                        alt="imagen2" 
                                        className="w-full h-auto max-h-80 sm:max-h-64 object-cover rounded-lg shadow-xl"
                                    />
                                </Link>
                            </div>

                            {/* imágenes superpuestas */}
                            <div className="hidden md:block relative w-full h-full min-h-[26rem]">
                                {/* Imagen 3 (izquierda) */}
                                <Link to="/IA" className="absolute left-0 top-0 w-[50%] max-w-[280px] z-20 hover:z-50 transition-all duration-300">
                                    <img 
                                        src="/Inicio/img6.jpg" 
                                        alt="imagen3" 
                                        className="w-full h-[22rem] object-cover rounded-lg shadow-xl 
                                            hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                                    />
                                </Link>
                                
                                {/* Imagen 1 (centro) */}
                                <Link to="/IA" className="absolute left-[55%] top-8 transform -translate-x-1/2 w-[55%] max-w-[300px] z-30 hover:z-50 transition-all duration-300">
                                    <img 
                                        src="/Inicio/img5.jpg" 
                                        alt="imagen1" 
                                        className="w-full h-[22rem] object-cover rounded-lg shadow-xl 
                                            hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                                    />
                                </Link>
                                
                                {/* Imagen 2 (derecha) */}
                                <Link to="/IA" className="absolute left-[60%] right-0 top-17 w-[50%] max-w-[280px] z-50 hover:z-50 transition-all duration-300">
                                    <img 
                                        src="/Inicio/img4.jpg" 
                                        alt="imagen2" 
                                        className="w-full h-[22rem] object-cover rounded-lg shadow-xl 
                                            hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>
                
                <div className="w-full max-w-4xl mx-auto p-6 text-white text-justify md:text-left">
                    <h1 className="text-white text-5xl mb-10">Con tres bibliotecas cargadas del <br /> contenido de su preferencias</h1>
                    {/* Primer bloque */}
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                            <img 
                                src="/Inicio/logo4.png" 
                                alt="The Movie DB Logo" 
                                className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-white md:text-left">
                                The Movie Database (IMDb) API es una potente herramienta que permite acceder a una amplia base de datos de películas, series y octones. Ofrece información actualizada como títulos, sinergias, pásicas, tralhes, calificaciones y mucho más, ideal para integrar contenido multimedia en aplicaciones o sitios web.
                            </p>
                        </div>
                    </div>

                    {/* Segundo bloque */}
                    <div className="mt-12 flex flex-col md:flex-row-reverse gap-6 items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                            <img 
                                src="/Inicio/logo5.png" 
                                alt="IGDB Logo" 
                                className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-white md:text-left">
                                La API de IGDB (Internet Game Database) proporciona acceso a una extensa base de datos de videojuegos. Permite obtener información detallada como títulos, descripciones, géneros, plataformas, fechas de lanzamiento, desarrolladores y mucho más.
                            </p>
                        </div>
                    </div>

                    {/* Tercer bloque */}
                    <div className="mt-12 flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                            <img 
                                src="/Inicio/logo6.png" 
                                alt="Open Library Logo" 
                                className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-white md:text-left">
                                La API de Open Library brinda acceso libre a una gran base de datos de libros, incluyendo detalles como autores, títulos, ediciones, temas y portadas. Es una herramienta ideal para desarrolladores que desean mostrar información bibliográfica.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8  bg-tranparent rounded-lg shadow-md">
                    {/* Columna izquierda - Texto */}
                    <div className="w-full md:w-1/2 space-y-4 text-white px-4 sm:px-8 md:px-16 xl:px-32 text-center md:text-left">
                        <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-none mb-0 font-exo md:text-left">
                            Y búsquedas potenciadas y personalizadas con nuestra IA
                        </h1>
                        <p className="text-lg md:text-left">
                            Mencione o describa características, escenas o sinopsis del contenido que necesita y nuestra IA lo encontrará por usted
                        </p>
                    </div>

                    {/* Columna derecha - Imagen */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img 
                        src="/Inicio/img7.png" 
                        alt="Ilustración de inteligencia artificial" 
                        className="max-w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio;