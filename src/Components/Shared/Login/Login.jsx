import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { login } from "../../../redux/auth/thunks";
import { logOut } from "../../../redux/auth/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../redux/users/thunks";
import { getAuth } from "firebase/auth";

const Login = (props) => {
  const [userInput] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let auth = getAuth();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const usersList = useSelector((state) => state.users.list);

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
          props.setShowNav(false);
          alert("Te logueaste con exito");
          return data;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onClick = async () => {
    const resp = await dispatch(logOut());
    isLogged();
    navigate("/");
    props.setShowNav(false);
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
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;
      let user = usersList.find((user) => user.firebaseUid == uid);
      return user;
    }

    // const showProfile = () => {

    // };
  };

  return (
    <>
      {!isLogged() ? (
        <div className={styles.loginContainer}>
          <div className={styles.register}>
            <h3>No tenes una cuenta?</h3>
            <Link to="/register" onClick={() => props.setShowNav(false)}>
              Registrate!
            </Link>
          </div>
          <div className={styles.log}>
            <h3>Si ya tenes</h3>
            <p>Logueate aca abajo!</p>
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
              <Link
                to="/forgotpassword"
                onClick={() => props.setShowNav(false)}
              >
                No te acordas tu contraseña?
              </Link>
              <input
                type="submit"
                id="submitLogIn"
                value="Enviar"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.containerLogged}>
          <h2>Hola {`${getLoggedUserData().name + "!"}`}</h2>
          <Link to={`/user`} onClick={() => props.setShowNav(false)}>
            Ver mi perfil
          </Link>
          <div className={styles.logOutContainer}>
            <button onClick={() => onClick()}>Salir</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
