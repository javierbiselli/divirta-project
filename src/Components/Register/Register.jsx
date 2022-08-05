import React from "react";
import styles from './register.module.css';

const Register = () => {
    return (
        <div className={styles.container}>
            <h3>Registrate</h3>
            <form>
                <input type="text" placeholder="Nombre" />
                <input type="text" placeholder="Apellido" />
                <input type="email" placeholder="Email" />
                <input type="number" placeholder="Telefono"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Repeti tu password"/>
                <input type="submit" value="Continuar"/>
            </form>
        </div>
    );
};

export default Register;