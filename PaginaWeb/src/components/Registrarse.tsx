import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Data/Firebase";
import { useNavigate } from "react-router-dom";
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
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          placeholder="Nombre Usuario"
          required
        />
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
        <button type="submit" disabled={submitbutton}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
