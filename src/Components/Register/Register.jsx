import React from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/users/thunks";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const user = await dispatch(addUser(data));
    if (
      user.message == "The email address is already in use by another account."
    ) {
      alert(
        "El email que introduciste ya esta registrado, porfavor usa otro o logueate"
      );
    } else if (user.error) {
      alert(user.message);
    } else {
      alert("Registro correcto");
      navigate("/");
    }
  };
  return (
    <div className={styles.registerContainer}>
      <h3>Registrate</h3>
      <form>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Apellido"
          name="last_name"
          {...register("last_name")}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register("email")}
        />
        <input
          type="number"
          placeholder="Telefono"
          name="tel"
          {...register("tel")}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...register("password")}
        />
        <input
          type="submit"
          value="Continuar"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default Register;
