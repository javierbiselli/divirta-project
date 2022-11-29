import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/users/thunks";
import Header from "./Header/Header";
// import Footer from "./Footer/Footer";
import styles from "./layout.module.css";
import NavBar from "./NavBar/NavBar";

const Layout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getusers ejecutado");
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contentNavBarContainer}>
        <NavBar />
        <div className={styles.content}>{props.children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
