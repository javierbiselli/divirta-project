import styles from "./header.module.css";
import { useState } from "react";
import Login from "../../Login/Login";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <header className={styles.container}>
        <button
          onClick={
            showNav == false ? () => setShowNav(true) : () => setShowNav(false)
          }
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1>
          DIVIRTA-<div>MONOS</div>
        </h1>
      </header>
      {showNav == true ? (
        <nav className={styles.containerNav}>
          <div className={styles.links}>
            <ul>
              <a href="#">
                <li>Ver salones</li>
              </a>
              <a href="#">
                <li>Publica tu salon</li>
              </a>
            </ul>
          </div>
          <div className={styles.headerBar}></div>
          <Login />
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
