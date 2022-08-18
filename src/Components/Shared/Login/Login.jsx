/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import { Link } from "react-router-dom";
import { login } from '../../../redux/auth/thunks';
import { logOut } from "../../../redux/auth/thunks";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import firebaseApp from "../../../firebase";
import { getUsers } from "../../../redux/users/thunks";
import { getAuth } from "firebase/auth";

const Login = (props) => {
  const [userInput] = useState('');
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const usersList = useSelector((state) => state.users.list);

  const {
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: userInput.email,
      password: userInput.password
    }
  });

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(login(data));
      if (user.type === 'LOGIN_ERROR') {
        alert('Email o password incorrectos');
        throw user.payload;
      }
      switch (user.payload.role) {
        case 'USER':
          navigate('/');
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
    navigate('/');
    props.setShowNav(false);
    if (!resp.error) {
      alert(resp.message);
    }
  };

  const isLogged = () => {
    const user = firebaseApp.auth();
    if (user._delegate.currentUser == null) {
      return false;
    } else {
      return true;
    }
  };

  let getLoggedUserData = () => {
    let auth = getAuth();
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
      {!isLogged() ?
        <div className={styles.container}>
          <div className={styles.register}>
            <h3>No tenes una cuenta?</h3>
            <Link to='/register' onClick={() => props.setShowNav(false)}>Registrate!</Link>
          </div>
          <div className={styles.log}>
            <h3>Si ya tenes</h3>
            <p>Logueate aca abajo!</p>
          </div>
          <form>
            <input type="email" placeholder="Email" name="email" {...register("email")}/>
            <input type="password" placeholder="Password" name="password" {...register("password")} />
            <div className={styles.buttons}>
              <Link to='/forgotpassword' onClick={() => props.setShowNav(false)}>No te acordas tu contraseña?</Link>
              <input type="submit" id="submitLogIn" value="Enviar" onClick={handleSubmit(onSubmit)} />
            </div>
          </form>
        </div>
        : <div className={styles.containerLogged}>
            <h2>Hola {`${getLoggedUserData().name + '!'}`}</h2>
            <Link to={`/users/${getLoggedUserData()._id}`} onClick={() => props.setShowNav(false)}>Ver mi perfil</Link>
            <div className={styles.logOutContainer}>
              <button onClick={() => onClick()}>Salir</button>
            </div>
          </div>
        }
    </>
  );
};

export default Login;