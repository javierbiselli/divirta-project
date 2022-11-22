import { useState } from "react";
import { getAuth } from "firebase/auth";
import styles from "./navBar.module.css";
import { Link } from "react-router-dom";
import Login from "../../Login/Login";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const auth = getAuth();

  const [showNav, setShowNav] = useState(
    window.innerWidth > 767 ? true : false
  );

  return (
    <>
      <div className={styles.menuButtonContainer}>
        <button
          className={styles.menuButton}
          onClick={
            showNav == false ? () => setShowNav(true) : () => setShowNav(false)
          }
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <AnimatePresence>
        {showNav ? (
          <motion.nav
            initial={{
              opacity: 0,
              x: -300,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              x: -300,
              transition: {
                duration: 0.2,
              },
            }}
            className={styles.containerNav}
          >
            <div className={styles.containerNavDiv}>
              <div className={styles.links}>
                <ul>
                  <Link to="/">
                    <li>
                      <i className="fa-solid fa-magnifying-glass"></i>
                      Buscar salones
                    </li>
                  </Link>
                  {auth.currentUser ? (
                    <Link to="/post">
                      <li>
                        <i className="fa-regular fa-square-plus"></i>
                        Publica tu salon
                      </li>
                    </Link>
                  ) : (
                    <Link to="/register">
                      <li>Publica tu salon</li>
                    </Link>
                  )}
                </ul>
              </div>
              <div className={styles.headerBar}></div>
              <Login showNav={showNav} setShowNav={setShowNav} />
            </div>
          </motion.nav>
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
