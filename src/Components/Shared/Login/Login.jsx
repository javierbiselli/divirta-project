import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { login } from "../../../redux/auth/thunks";
import { logOut } from "../../../redux/auth/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import ButtonLoader from "../Loader/ButtonLoader";

const Login = () => {
  const [userInput] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const usersList = useSelector((state) => state.users.list);

  let getLoggedUserData = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;
      let user = usersList.find((user) => user.firebaseUid == uid);
      return user;
    }
  };

  const { handleSubmit, register } = useForm({
    mode: "onChange",
    defaultValues: {
      email: userInput.email,
      password: userInput.password,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await dispatch(login(data));
      if (
        user.payload ===
          "FirebaseError: Firebase: The password is invalid o… does not have a password. (auth/wrong-password)." ||
        user.payload ===
          "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
      ) {
        alert("Email o password incorrectos o el usuario no existe");
        setLoading(false);
        throw user.payload;
      } else if (
        user.payload ===
        "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        alert(
          "Intentaste loguearte sin exito demasiadas veces, si olvidaste tu contraseña podes recuperarla haciendo click en 'olvide mi contraseña' o espera un rato para volver a loguearte"
        );
        setLoading(false);
        throw user.payload;
      } else {
        setLoading(false);
      }
      switch (user.payload.role) {
        case "USER":
          navigate("/");
          alert("Te logueaste con exito");
          window.localStorage.setItem(
            "user",
            JSON.stringify(getLoggedUserData())
          );
          setLoading(false);
          return data;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const onLogOut = async () => {
    const resp = await dispatch(logOut());
    window.localStorage.removeItem("user");
    navigate("/");
    if (!resp.error) {
      alert(resp.message);
    }
  };

  const lsUserData = JSON.parse(window.localStorage.getItem("user"));

  return (
    <>
      {lsUserData ? (
        <div className={styles.containerLogged}>
          <h2>Hola {`${lsUserData.name + "!"}`}</h2>
          <Link to={`/user`}>Ver mi perfil</Link>
          <div className={styles.logOutContainer}>
            <button onClick={() => onLogOut()} className={styles.logOutButton}>
              Salir de mi cuenta
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <ButtonLoader loading={loading} />
          <div className={styles.register}>
            <Link to="/register">Registrate</Link> para ver todas las
            funcionalidades de la app
          </div>
          <div className={styles.log}>
            <p>o logueate aca:</p>
          </div>
          <form>
            <input
              type="email"
              placeholder="Email..."
              name="email"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              {...register("password")}
            />
            <div className={styles.buttons}>
              <input
                type="submit"
                id="submitLogIn"
                value="Enviar"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
