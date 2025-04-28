import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Data/Firebase";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const [formulario, setFormulario] = useState({ email: "", password: "" });
  const [button, setButtonDesabilitado] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (formulario.email.length > 0 && formulario.password.length > 0) {
      setButtonDesabilitado(false);
    } else {
      setButtonDesabilitado(true);
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
    <>
    <h1>INICIAR SESION</h1>
    
    <form onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        value={formulario.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formulario.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={button}>
        INGRESAR
      </button>
      <p>Crear Cuenta en esta pagian ir al link</p>
      <Link to={"/registrar"}>Registrar</Link>
    </form>
    </>
    
  );
};

export default Login;
