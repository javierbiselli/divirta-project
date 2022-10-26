import styles from "./header.module.css";
import { useState } from "react";
import Login from "../../Login/Login";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = getAuth();
  const [showNav, setShowNav] = useState(
    window.innerWidth > 767 ? true : false
  );

  const isLoading = useSelector((state) => state.salons.isLoading);

  useEffect(() => {
    wideScreen();
  }, [showNav]);

  const wideScreen = () => {
    if (window.innerWidth > 767) {
      setShowNav(true);
    }
  };

  return (
    <>
      <header className={styles.container}>
        {isLoading ? (
          <div></div>
        ) : (
          <button
            onClick={
              showNav == false
                ? () => setShowNav(true)
                : () => setShowNav(false)
            }
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        )}

        <h1>
          DIVIRTA-<div>MONOS</div>
        </h1>
      </header>
      {showNav ? (
        <nav className={styles.containerNav}>
          <div className={styles.links}>
            <ul>
              <Link to="/" onClick={() => setShowNav(false)}>
                <li>Ver salones</li>
              </Link>
              {auth.currentUser ? (
                <Link to="/post" onClick={() => setShowNav(false)}>
                  <li>Publica tu salon</li>
                </Link>
              ) : (
                <Link to="/register" onClick={() => setShowNav(false)}>
                  <li>Publica tu salon</li>
                </Link>
              )}
            </ul>
          </div>
          <div className={styles.headerBar}></div>
          <Login showNav={showNav} setShowNav={setShowNav} />
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
