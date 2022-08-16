import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import styles from './login.module.css';
import { Link } from "react-router-dom";
import { login } from '../../../redux/auth/thunks';
import { logOut } from "../../../redux/auth/thunks";
import { useForm } from 'react-hook-form';

const Login = (props) => {
  const [userInput] = useState('');

  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);

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
    console.log(data);
    try {
      const user = await dispatch(login(data));
      console.log('user', user);
      if (user.type === 'LOGIN_ERROR') {
        alert('Email o password incorrectos');
        throw user.payload;
      }
      switch (user.payload.role) {
        case 'User':
          setIsLogged(true);
          break;
        default:
          break;
      }
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async () => {
    const resp = await dispatch(logOut());
    if (!resp.error) {
      alert(resp.message);
      history.push('/');
    }
  };

  return (
    <>
      {isLogged === false ?
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
            <h2>user logged</h2>
            <button onClick={() => onClick()}>Salir</button>
          </div>
        }
    </>
  );
};

export default Login;