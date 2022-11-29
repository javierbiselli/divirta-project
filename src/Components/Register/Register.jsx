import React from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/users/thunks";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "../Shared/Input/Input";
import { useState } from "react";
import ButtonLoader from "../Shared/Loader/ButtonLoader";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const registrationSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    last_name: Joi.string().required().min(3).max(30),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    tel: Joi.number().required().max(99999999999),
    password: Joi.string()
      .min(6)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        "string.pattern.base": "Debe contener letras y al menos un numero",
        "string.empty": "La contraseña es requerida",
        "string.min": "Debe tener al menos 6 caracteres",
      }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    if (
      errors.name ||
      errors.last_name ||
      errors.email ||
      errors.tel ||
      errors.password
    ) {
      alert("Tenes campos en rojo, porfavor revisalos");
    } else {
      setLoading(true);
      const user = await dispatch(addUser(data));
      if (
        user.message ==
        "The email address is already in use by another account."
      ) {
        setLoading(false);
        alert(
          "El email que introduciste ya esta registrado, porfavor usa otro o logueate"
        );
      } else if (user.error) {
        setLoading(false);
        alert(user.message);
      } else {
        setLoading(false);
        alert("Registro correcto! Ya podes loguearte");
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerFormContainer}>
        <h3>Registrate</h3>
        <form>
          <Input
            type={"text"}
            name={"name"}
            placeholder={"Nombre"}
            register={register}
            error={errors.name?.message}
          />
          <Input
            type={"text"}
            name={"last_name"}
            placeholder={"Apellido"}
            register={register}
            error={errors.last_name?.message}
          />
          <Input
            type={"text"}
            name={"email"}
            placeholder={"Email"}
            register={register}
            error={errors.email?.message}
          />
          <Input
            type={"number"}
            name={"tel"}
            placeholder={"Telefono (sin 0 ni 15)"}
            register={register}
            error={errors.tel?.message}
          />
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Password (al menos 10 caracteres)"}
            register={register}
            error={errors.password?.message}
          />
          <p>{errors.password?.message}</p>
          <div className={styles.submitRegisterButtonContainer}>
            <input
              type="submit"
              value="Continuar"
              onClick={handleSubmit(onSubmit)}
              className={styles.registerSubmit}
            />
          </div>
        </form>
      </div>
      <ButtonLoader loading={loading} />
    </div>
  );
};

export default Register;
