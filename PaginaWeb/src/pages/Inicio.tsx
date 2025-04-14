import { Link } from "react-router-dom"; 

const Inicio = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
                {/* Columna izquierda */}
                <div className="w-full md:w-[50%] flex flex-col items-start justify-start p-6 md:p-14 md:ml-20">
                    <div className="max-w-2xl w-full mt-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-none md:mb-4">
                                WIKIGEEK
                            </h1>
                            <img src="/Inicio/logo2.png" alt="Logo Wikigeek" className="h-14 md:h-24 lg:h-32" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none mb-0 font-exo whitespace-nowrap">
                            El catálogo más <br />
                            grande de <br />
                            entretenimiento
                        </h1>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="w-full md:w-[40%] flex flex-col items-center justify-center p-3 md:p-12">
                    {/* Contenedor de imágenes */}
                    <div className="relative w-full max-w-md h-auto md:h-[28rem] flex md:block items-center justify-center gap-4 md:gap-0 mb-4 mt-6 md:mt-10">
                        {/* Mobile layout */}
                        <div className="flex flex-col md:hidden gap-4">
                            <Link to="/IA">
                                <img 
                                    src="/Inicio/img3.jpg" 
                                    alt="imagen3" 
                                    className="w-full object-cover rounded-lg shadow-xl"
                                />
                            </Link>
                            <Link to="/IA">
                                <img 
                                    src="/Inicio/img1.jpg" 
                                    alt="imagen1" 
                                    className="w-full object-cover rounded-lg shadow-xl"
                                />
                            </Link>
                            <Link to="/IA">
                                <img 
                                    src="/Inicio/img2.jpg" 
                                    alt="imagen2" 
                                    className="w-full object-cover rounded-lg shadow-xl"
                                />
                            </Link>
                        </div>

                        {/* Desktop layout */}
                        <div className="hidden md:block relative w-full h-full">
                            <Link to="/IA">
                                <img 
                                    src="/Inicio/img3.jpg" 
                                    alt="imagen3" 
                                    className="absolute w-54 h-82 object-cover rounded-lg shadow-xl left-0 top-4 z-20 
                                        transition-all duration-500 ease-out hover:z-50 hover:scale-125 hover:-translate-y-8 hover:shadow-2xl"
                                />
                            </Link>
                            <Link to="/IA">
                                <img 
                                    src="/Inicio/img1.jpg" 
                                    alt="imagen1" 
                                    className="absolute w-54 h-82 object-cover rounded-lg shadow-xl left-1/2 transform -translate-x-1/2 top-16 z-30 
                                        transition-all duration-500 ease-out hover:z-50 hover:scale-125 hover:-translate-y-8 hover:shadow-2xl"
                                />
                            </Link>
                            <Link to="/IA">
                                <img 
                                    src="/Inicio/img2.jpg" 
                                    alt="imagen2" 
                                    className="absolute w-54 h-82 object-cover rounded-lg shadow-xl right-0 top-32 z-10 
                                        transition-all duration-500 ease-out hover:z-50 hover:scale-125 hover:-translate-y-8 hover:shadow-2xl"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Botón */}
                    <div className="w-full text-center mt-0">
                        <Link
                            to="/IA"
                            className="inline-block px-10 py-3 bg-transparent text-white text-lg font-bold rounded-2xl border-2 border-white hover:bg-gray-900 transition-colors duration-300"
                        >
                            IR AL INICIO
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio;
