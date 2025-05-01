import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Data/Firebase";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const [formulario, setFormulario] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (formulario.email.length > 0 && formulario.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formulario]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        formulario.email,
        formulario.password
      );
  
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bienvenido",
        showConfirmButton: false,
        timer: 1500
      });
      
      navigate(`/`);
  
      console.log("Usuario Logueado con éxito");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Algo salió mal!",
      });
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-start p-0 w-full">
    {/* Container */}
    <div className="flex flex-col md:flex-row items-start gap-10 w-full h-full">
      {/* columna izquierda*/}
      <div
        className="md:w-[80%] flex flex-col justify-center items-center md:items-start space-y-6 md:space-y-8 lg:space-y-10 px-4 bg-cover bg-center"
        style={{
          backgroundImage: "url('/login/login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: '100vh'  // Asegura que la imagen cubra todo el alto disponible
        }}
      >
        {/* Logo + Wikigeek */}
        <div className="flex flex-col items-center md:items-start ml-60 space-y-0 "> 
          <div className="flex items-center">
            <h1 className="text-1x1 sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              WIKIGEEK
            </h1>
            <img
              src="/Inicio/logo2.png"
              alt="Logo Wikigeek"
              className="h-12 sm:h-16 md:h-20 lg:h-24 ml-3 animate-pulse"
            />
          </div>

          {/* Slogan */}
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold leading-none">
            El catálogo más grande <br/>
            de entretenimiento
          </h1>
        </div>

      </div>

      {/* columna derecha */}
      <div className="md:w-1/2 w-full flex items-center justify-center h-screen">
        <div className="w-full max-w-xs"> 
          <form onSubmit={handleLogin} className="space-y-6 text-center max-w-4xl mx-auto px-4">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-bold">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border-b border-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Contraseña*/}
            <div>
              <label className="block mb-2 text-sm font-bold">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formulario.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border-b border-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-center space-x-4">
              <a href="https://" target="_blank" rel="noopener noreferrer">
                <img src="/login/login1.png" alt="Logo 1" className="w-auto h-9 cursor-pointer" />
              </a>
              <a href="https://" target="_blank" rel="noopener noreferrer">
                <img src="/login/login2.png" alt="Logo 2" className="w-auto h-12 cursor-pointer" />
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={buttonDisabled}
              className={` w-full py-3 font-bold rounded-none transition-colors ${
                buttonDisabled ? "bg-tranparent border rounded-sm border-amber-50 cursor-not-allowed" : "bg-white text-black hover:bg-gray-300"
              }`}
            >
              INICIAR SESIÓN
            </button>
          </form>

          {/* Registration link */}
          <p className="text-center mt-6 text-lg font-bold">
            ¿No tienes cuenta?{' '}
            <Link to="/registrar" className="text-white hover:underline">
              ¡Regístrate!
            </Link>
          </p>
        </div>
      </div>

    </div>
  </div>




  );
};

export default Login;