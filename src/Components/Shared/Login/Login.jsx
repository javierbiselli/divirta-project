import React, { useState } from "react";
import styles from './login.module.css';
import { Link } from "react-router-dom";

const Login = () => {
  const [isLogged, setIsLogged] = useState(false);
  const submit = () => {
    alert('usuario logueado');
    setIsLogged(true);
  };
  console.log(isLogged);
  return (
    <>
      {isLogged === false ?
        <div className={styles.container}>
          <div className={styles.register}>
            <h3>No tenes una cuenta?</h3>
            <Link to='/register'>Registrate!</Link>
          </div>
          <div className={styles.log}>
            <h3>Si ya tenes</h3>
            <p>Logueate aca abajo!</p>
          </div>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className={styles.buttons}>
              <Link to='/forgotpassword'>No te acordas tu contraseña?</Link>
              <input type="submit" id="submitLogIn" value="Enviar" onClick={() => submit()} />
            </div>
          </form>
        </div>
        : <div className={styles.containerLogged}>
            <h2>user logged</h2>
            <button onClick={() => setIsLogged(false)}>Salir</button>
          </div>
        }
    </>
  );
};

export default Login;