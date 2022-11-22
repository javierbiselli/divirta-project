import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { login } from "../../../redux/auth/thunks";
import { logOut } from "../../../redux/auth/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Login = (props) => {
  const [userInput] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.users.list);
  const isLoading = useSelector((state) => state.users.isLoading);

  const { handleSubmit, register } = useForm({
    mode: "onChange",
    defaultValues: {
      email: userInput.email,
      password: userInput.password,
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(login(data));
      if (user.type === "LOGIN_ERROR") {
        alert("Email o password incorrectos");
        throw user.payload;
      }
      switch (user.payload.role) {
        case "USER":
          navigate("/");
          alert("Te logueaste con exito");
          return data;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onLogOut = async () => {
    const resp = await dispatch(logOut());
    isLogged();
    navigate("/");
    if (!resp.error) {
      alert(resp.message);
    }
  };

  const isLogged = () => {
    const user = getAuth();
    if (user.currentUser == null) {
      return false;
    } else {
      return true;
    }
  };

  // const auth = getAuth();
  // console.log(auth);

  // const isLogged = () => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("user", user);
  //     const uid = user.uid;
  //     if (user) {
  //       console.log(uid);
  //       let user = usersList.find((user) => user.firebaseUid == uid);
  //       return user;
  //       // ...
  //     } else {
  //       return false;
  //     }
  //   });
  // };

  let getLoggedUserData = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;
      let user = usersList.find((user) => user.firebaseUid == uid);
      return user;
    }
  };

  return (
    <>
      {isLoading && props.showNav ? (
        <span>CARGANDO...</span>
      ) : getLoggedUserData() ? (
        <div className={styles.containerLogged}>
          <h2>Hola {`${getLoggedUserData().name + "!"}`}</h2>
          <Link to={`/user`}>Ver mi perfil</Link>
          <div className={styles.logOutContainer}>
            <button onClick={() => onLogOut()} className={styles.logOutButton}>
              Salir de mi cuenta
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.register}>
            <h3>No tenes una cuenta?</h3>
            <Link to="/register">Registrate!</Link>
          </div>
          <div className={styles.log}>
            <h3>Si ya tenes</h3>
            <p>Logueate aca</p>
          </div>
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              {...register("password")}
            />
            <div className={styles.buttons}>
              <Link to="/forgotpassword">No te acordas tu contraseña?</Link>
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
