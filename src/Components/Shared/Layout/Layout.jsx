import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "./layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
