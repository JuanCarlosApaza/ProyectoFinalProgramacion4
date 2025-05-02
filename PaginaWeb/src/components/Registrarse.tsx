import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Data/Firebase";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Register: React.FC = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    password: "",
    email: "",
  });
  const [submitbutton, setdubmitbutton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      formulario.email.length > 0 &&
      formulario.password.length > 0 &&
      formulario.nombre.length > 0
    ) {
      setdubmitbutton(false);
    } else {
      setdubmitbutton(true);
    }
  }, [formulario]);
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.email || !formulario.password) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe llenar todos los campos",
        });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formulario.email,
        formulario.password
      );

      await updateProfile(userCredential.user, {
        displayName: formulario.nombre,
      });

      console.log("Usuario registrado con éxito");
      Swal.fire({
        title: "Exito",
        icon: "success",
        draggable: true
      });
      navigate("/");
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal! usuario no se  pudo registrar",
          });
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
    
    {/* columna izquierda (imagen de fondo, solo en pantallas grandes) */}
    <div
      className="md:w-[80%] flex-col justify-center items-center md:items-start space-y-6 md:space-y-8 lg:space-y-10 px-4 bg-cover bg-center hidden md:block"
      style={{
        backgroundImage: "url('/login/login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: '100vh'
      }}
    >
      {/* Logo + Wikigeek */}
      <div className="flex flex-col items-center md:items-start ml-60 space-y-0">
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

    {/* columna derecha (formulario de registro) */}
    <div className="md:w-1/2 w-full flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleRegister} className="space-y-6 text-center">
          {/* Nombre de usuario */}
          <div>
            <label className="block mb-2 text-sm font-bold">Nombre de usuario</label>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border-b border-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Correo electrónico */}
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

          {/* Contraseña */}
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

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={submitbutton}
            className={`w-full py-3 font-bold rounded-none transition-colors ${
              submitbutton ? "bg-tranparent border rounded-sm border-amber-50 cursor-not-allowed" : "bg-white text-black hover:bg-gray-300"
            }`}
          >
            REGISTRARSE
          </button>
        </form>

        {/* Enlace a login */}
        <p className="text-center mt-6 text-lg font-bold">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="text-white hover:underline">
            ¡Inicia sesión!
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default Register;