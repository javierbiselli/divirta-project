import React, { useState } from "react";
import styles from './login.module.css';

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      {isLogged == false ?
        <div className={styles.container}>
          <div className={styles.register}>
            <h3>No tenes una cuenta?</h3>
            <a href='#'>Registrate!</a>
          </div>
          <div className={styles.log}>
            <h3>Si ya tenes</h3>
            <p>Logueate aca abajo!</p>
          </div>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className={styles.buttons}>
              <a href='#'>No te acordas tu contraseña?</a>
              <input type="submit" />
            </div>
          </form>
        </div>
        : 'user logged'}
    </>
  );
};

export default Login;