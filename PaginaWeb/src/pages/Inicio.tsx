import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Inicio = () => {
  const seccion1Ref = useRef<HTMLDivElement>(null);
  const seccion2Ref = useRef<HTMLDivElement>(null);
  const seccion3Ref = useRef<HTMLDivElement>(null);
  const seccion4Ref = useRef<HTMLDivElement>(null);
  const seccion5Ref = useRef<HTMLDivElement>(null);
  const seccion6Ref = useRef<HTMLDivElement>(null);
  const seccion7Ref = useRef<HTMLDivElement>(null);

  const [estaVisible, setEstaVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
  });

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            const sectionId = entrada.target.getAttribute("data-section") || "";
            setEstaVisible((prev) => ({ ...prev, [sectionId]: true }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const refs = [
      seccion1Ref,
      seccion2Ref,
      seccion3Ref,
      seccion4Ref,
      seccion5Ref,
      seccion6Ref,
      seccion7Ref,
    ];

    refs.forEach((ref) => {
      if (ref.current) observador.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observador.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 w-full min-h-screen">
        {/* 1er Contenedor Principal */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 w-full min-h-screen">
          {/* 1er Contenedor Principal */}
          <div className="min-h-screen flex flex-col md:flex-row bg-transparent text-white overflow-x-hidden">
            {/* Columna izquierda (Texto) */}
            <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-center p-4 sm:p-6 md:p-14 lg:p-20 text-center md:text-left">
              <div className="max-w-2xl w-full">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none">
                    WIKIGEEK
                  </h1>
                  <img
                    src="/Inicio/logo2.png"
                    alt="Logo Wikigeek"
                    className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24 ml-2"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 font-exo">
                  El catálogo más <br /> grande de entretenimiento
                </h1>
                <p className="text-lg sm:text-xl md:text-3xl mb-6 sm:mb-8">
                  Te damos la bienvenida al catálogo de juegos, películas y libros
                  más grande de toda la web, esto es WikiGeek
                </p>
              </div>
            </div>

            {/* Columna derecha (Imágenes) */}
            <div className="w-full md:w-[45%] grid grid-cols-1 items-center justify-items-center p-4 sm:p-6 md:p-8 lg:p-10 mt-0">
              {/* Contenedor de imágenes */}
              <div className="relative w-full max-w-md md:max-w-full h-auto md:min-h-[30rem] flex items-center justify-center gap-0 md:gap-0">
                {/* Vista en móvil */}
                <div className="flex flex-col md:hidden gap-3 sm:gap-4 w-full">
                  <Link to="/Games" className="w-full group">
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4">
                      <div className="w-full bg-black/80 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        PELICULAS
                      </div>
                      <div className="overflow-hidden rounded-b-lg shadow-xl">
                        <img
                          src="/Inicio/img3.jpg"
                          alt="imagen3"
                          className="w-full h-auto max-h-96 sm:max-h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Link>

                  <Link to="/Peliculas" className="w-full group">
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4">
                      <div className="w-full bg-black/80 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        VIDEO JUEGOS
                      </div>
                      <div className="overflow-hidden rounded-b-lg shadow-xl">
                        <img
                          src="/Inicio/img1.jpg"
                          alt="imagen1"
                          className="w-full h-auto max-h-96 sm:max-h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Link>

                  <Link to="/Books" className="w-full group">
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4">
                      <div className="w-full bg-black/80 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        LIBROS
                      </div>
                      <div className="overflow-hidden rounded-b-lg shadow-xl">
                        <img
                          src="/Inicio/img2.jpg"
                          alt="imagen2"
                          className="w-full h-auto max-h-96 sm:max-h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Vista en desktop */}
                <div className="hidden md:flex relative w-full h-full min-h-[36rem] justify-center items-center">
                  {/* Imagen 3 */}
                  <Link
                    to="/Games"
                    className="absolute left-0 top-0 w-[45%] max-w-[350px] z-20 group hover:z-50 transition-all duration-300"
                  >
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4">
                      <div className="w-full bg-black/80 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        VIDEOJUEGOS
                      </div>
                      <div className="relative overflow-hidden rounded-b-lg shadow-xl">
                        <img
                          src="/Inicio/img3.jpg"
                          alt="imagen3"
                          className="w-full h-auto max-h-[35rem] object-cover"
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Imagen 1 */}
                  <Link
                    to="/Peliculas"
                    className="absolute left-1/2 top-15 transform -translate-x-1/2 w-[50%] max-w-[360px] z-30 group hover:z-50 transition-all duration-300"
                  >
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4">
                      <div className="w-full bg-black/80 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        PELÍCULAS
                      </div>
                      <div className="relative overflow-hidden rounded-b-lg shadow-xl">
                        <img
                          src="/Inicio/img1.jpg"
                          alt="imagen1"
                          className="w-full h-auto max-h-[38rem] object-cover"
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Imagen 2 */}
                  <Link
                    to="/Books"
                    className="absolute right-0 top-28 w-[45%] max-w-[350px] z-10 group hover:z-50 transition-all duration-300"
                  >
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4">
                      <div className="w-full bg-black/80 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        LIBROS
                      </div>
                      <div className="relative overflow-hidden rounded-b-lg shadow-xl">
                        <img
                          src="/Inicio/img2.jpg"
                          alt="imagen2"
                          className="w-full h-auto max-h-[34rem] object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                
              </div>
              {/* Botón para buscar por IA - Margen superior reducido */}
              <div className="w-full text-center mt-2 md:mt-0">
                <Link
                  to="/IA"
                  className="inline-block px-6 sm:px-8 py-2 sm:py-2.5 bg-transparent text-white text-sm sm:text-base md:text-lg font-bold rounded-xl border-2 border-white hover:bg-gray-900 transition-colors duration-300"
                >
                  BUSCAR CON IA
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>

        {/* Sección 1*/}
        <div
          ref={seccion1Ref}
          data-section="section1"
          className={` flex flex-col md:flex-row-reverse bg-transparent text-white overflow-x-hidden transition-opacity duration-1000 ease-in-out ${
            estaVisible.section1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Columna derecha*/}
          <div className="w-full md:w-[60%] flex flex-col items-center md:items-end justify-start p-4 sm:p-6 md:p-14 md:mr-0 lg:mr-0 text-center md:text-right">
            <div className="max-w-2xl w-full mt-2 md:mt-6">
              <h1 className="text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-none mb-0 font-exo md:text-right">
                Busca la <br className="hidden xs:block" />
                información <br className="hidden xs:block" />
                de tus juegos, películas o libros{" "}
                <br className="hidden xs:block" />
                favoritos
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 mb-6 sm:mb-8 md:text-right">
                Seleccione la categoría de su preferencia con <br /> nuestros
                botones y filtre por sus géneros favoritos para <br /> encontrar
                el material que guste
              </p>

            </div>
          </div>

          {/* Columna izquierda*/}
          <div className="w-full md:w-[40%] flex flex-col items-center p-3 sm:p-6 md:p-8 lg:p-10 mt-15">
            {/* Contenedor de imágenes*/}
            <div className="relative w-full max-w-md h-auto md:min-h-[26rem] flex md:block items-center justify-center gap-4 md:gap-0 mb-2 sm:mb-3 md:mb-4">
              {/* Vista Celular  */}
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

              {/* imágenes vista compu */}
              <div className="hidden md:block relative w-full h-full min-h-[26rem] ">
                {/* Imagen(izquierda) */}
                <Link
                  to="/IA"
                  className="absolute left-0 top-0 w-[50%] max-w-[280px] z-20 hover:z-50 transition-all duration-300"
                >
                  <img
                    src="/Inicio/img6.jpg"
                    alt="imagen3"
                    className="w-full h-[22rem] object-cover rounded-lg shadow-xl hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                  />
                </Link>

                {/* Imagen(centro) */}
                <Link
                  to="/IA"
                  className="absolute left-[55%] top-8 transform -translate-x-1/2 w-[55%] max-w-[300px] z-30 hover:z-50 transition-all duration-300"
                >
                  <img
                    src="/Inicio/img5.jpg"
                    alt="imagen1"
                    className="w-full h-[22rem] object-cover rounded-lg shadow-xl hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                  />
                </Link>

                {/* Imagen (derecha) */}
                <Link
                  to="/IA"
                  className="absolute left-[60%] right-0 top-17 w-[50%] max-w-[280px] z-50 hover:z-50 transition-all duration-300"
                >
                  <img
                    src="/Inicio/img4.jpg"
                    alt="imagen2"
                    className="w-full h-[22rem] object-cover rounded-lg shadow-xl hover:scale-110 hover:-translate-y-4 hover:shadow-2xl"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>

        {/* Sección 2 - Bibliotecas */}
        <div
          ref={seccion2Ref}
          data-section="section2"
          className={`w-full px-10 sm:px-12 md:px-4 lg:px-16 xl:px-20 py-12 text-white text-justify md:text-left transition-opacity duration-1000 ease-in-out ${
            estaVisible.section2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-white text-6xl sm:text-7xl mb-10 text-center">
              Con tres bibliotecas cargadas del <br /> contenido de su preferencia
            </h1>

            {/* Primer bloque - The Movie DB */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 mix-blend-overlay"></div>
                <img
                  src="/Inicio/logo4.png"
                  alt="The Movie DB Logo"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200  group-hover:border-purple-400 group-hover:scale-105 transition-all duration-500 ease-in-out shadow-lg 
                              group-hover:shadow-xl group-hover:shadow-purple-500/30"
                />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
              </div>
              <div className="flex-1">
                <p className="text-white md:text-left text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 mb-6 sm:mb-8">
                  The Movie Database (IMDb) API es una potente herramienta que
                  permite acceder a una amplia base de datos de películas, series
                  y octones. Ofrece información actualizada como títulos,
                  sinergias, pásicas, tralhes, calificaciones y mucho más, ideal
                  para integrar contenido multimedia en aplicaciones o sitios web.
                </p>
              </div>
            </div>

            {/* Segundo bloque - IGDB */}
            <div className="mt-12 flex flex-col md:flex-row-reverse gap-6 items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 mix-blend-overlay"></div>
                <img
                  src="/Inicio/logo5.png"
                  alt="IGDB Logo"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200 
                              group-hover:border-blue-400 group-hover:scale-105 
                              transition-all duration-500 ease-in-out shadow-lg 
                              group-hover:shadow-xl group-hover:shadow-blue-500/30"
                />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
                <span className="absolute -inset-2 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </div>
              <div className="flex-1">
                <p className="text-white md:text-left text-xl sm:text-2xl md:text-3xl">
                  La API de IGDB (Internet Game Database) proporciona acceso a una
                  extensa base de datos de videojuegos. Permite obtener
                  información detallada como títulos, descripciones, géneros,
                  plataformas, fechas de lanzamiento, desarrolladores y mucho más.
                </p>
              </div>
            </div>

            {/* Tercer bloque - Open Library */}
            <div className="mt-12 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 mix-blend-overlay"></div>
                <img
                  src="/Inicio/logo6.png"
                  alt="Open Library Logo"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200 
                              group-hover:border-amber-400 group-hover:scale-105 
                              transition-all duration-500 ease-in-out shadow-lg 
                              group-hover:shadow-xl group-hover:shadow-amber-500/30"
                />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
                <span className="absolute -inset-2 rounded-full bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </div>
              <div className="flex-1">
                <p className="text-white md:text-left text-xl sm:text-2xl md:text-3xl">
                  La API de Open Library brinda acceso libre a una gran base de
                  datos de libros, incluyendo detalles como autores, títulos,
                  ediciones, temas y portadas. Es una herramienta ideal para
                  desarrolladores que desean mostrar información bibliográfica.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>

        {/* Sección 3 - IA */}
        <div
          ref={seccion3Ref}
          data-section="section3"
          className={`flex flex-col md:flex-row items-center justify-between gap-0 bg-transparent rounded-lg shadow-md transition-opacity duration-1000 ease-in-out ${
            estaVisible.section3 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Columna izquierda */}
          <div className="w-full md:w-[60%] space-y-4 text-white px-4 sm:px-8 md:px-16 xl:px-32 text-center md:text-left">
            <h1 className="text-2xl xs:text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-none mb-0 font-exo md:text-left">
              Y búsquedas  potenciadas <br /> y personalizadas con nuestra IA
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-justify md:text-left">
              Mencione o describa características, escenas o sinopsis del
              contenido que necesita y nuestra IA lo encontrará por usted
            </p>
          </div>

          {/* Columna derecha */}
          <div className="w-full md:w-[40%] flex justify-center">
            <img
              src="/Inicio/img7.png"
              alt="Ilustración de inteligencia artificial"
              className="max-w-[80%] sm:max-w-[80%] h-auto rounded-lg md:mr-30"
            />
          </div>
        </div>
        <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto"></div>

        {/* Sección 4 - Libros */}
        <div
          ref={seccion7Ref}
          data-section="section7"
          className={`flex flex-col md:flex-row items-center justify-between gap-0 bg-transparent rounded-lg shadow-md transition-opacity duration-1000 ease-in-out ${
            estaVisible.section7 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Columna izquierda*/}
          <div className="w-full md:w-[30%] flex justify-center order-1 md:order-1 md:ml-30">
            <img
              src="/Inicio/img18.png"
              alt="Ilustración de inteligencia artificial"
              className="max-w-[90%] sm:max-w-[100%] h-auto rounded-lg"
            />
          </div>

          {/* Columna derecha*/}
          <div className="w-full md:w-[70%] space-y-2 text-white px-4 sm:px-8 md:px-16 xl:px-32 text-center md:text-left order-2 md:order-2">
            <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-none mb-2 font-exo md:text-left">
              Encuentra tus libros favoritos digitales y disfrútalos al instante
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-justify md:text-left">
              Te proporcionamos acceso para que puedas leer tus libros favoritos
              de forma rápida, sencilla y desde cualquier lugar
            </p>
          </div>
        </div>
        <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto mt-10"></div>

        {/* Sección 5 - LiKes */}
        <div
          ref={seccion5Ref}
          data-section="section5"
          className={`flex flex-col md:flex-row items-center justify-between gap-0 bg-transparent rounded-lg shadow-md transition-opacity duration-1000 ease-in-out ${
            estaVisible.section5 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Columna izquierda */}
          <div className="w-full md:w-[60%] space-y-4 text-white px-4 sm:px-8 md:px-16 xl:px-32 text-center md:text-left">
            <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-none mb-0 font-exo md:text-left">
              Comparte tus reacciones y comentarios en las páginas que más te
              gusten
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-justify md:text-left">
              Exprésate libremente dejando tus reacciones y comentarios en cada
              página que disfrutes. ¡Queremos saber qué piensas!
            </p>
          </div>

          {/* Columna derecha*/}
          <div className="w-full md:w-[40%] flex justify-center md:mr-10">
            <img
              src="/Inicio/img9.png"
              alt="Ilustración de interacciones"
              className="max-w-[80%] sm:max-w-[80%] h-auto rounded-lg md:mr-40"
            />
          </div>
        </div>
        <div className="border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto mt-10"></div>

        {/* Sección 6 - Registro */}
        <div
          ref={seccion6Ref}
          data-section="section6"
          className={`flex flex-col md:flex-row items-center justify-between gap-0 bg-transparent rounded-lg shadow-md transition-opacity duration-1000 ease-in-out mb-10 ${
            estaVisible.section6 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Columna izquierda */}
          <div className="w-full md:w-[40%] flex justify-center order-2 md:order-1 ">
            <img
              src="/Inicio/img121.png"
              alt="Ilustración de registro"
              className="max-w-[70%] sm:max-w-[70%] h-auto rounded-lg md:ml-20"
            />
          </div>

          {/* Columna derecha */}
          <div className="w-full md:w-[60%] space-y-2 text-white px-4 sm:px-8 md:px-16 xl:px-32 text-center md:text-left order-1 md:order-2">
            <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-none mb-2 font-exo md:text-left">
              Regístrate de forma segura y rápida para disfrutar de una
              experiencia personalizada
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-justify md:text-left">
              Crea tu cuenta en segundos con nuestro sistema de registro seguro
              y confiable, respaldado por la tecnología de Firebase
            </p>
          </div>
        </div>

        {/* Seccion final */}
        <div
          ref={seccion4Ref}
          data-section="section4"
          className={`border-t border-[0.8px] border-gray-300 mb-4 w-[90%] mx-auto transition-opacity duration-1000 ease-in-out ${
            estaVisible.section4 ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Inicio;
