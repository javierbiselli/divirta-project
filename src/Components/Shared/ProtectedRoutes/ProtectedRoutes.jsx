import { Outlet } from "react-router-dom";
import Register from "../../Register/Register";

const ProtectedRoutes = () => {
  const user = window.localStorage.getItem("user");
  return user ? <Outlet /> : <Register />;
};

export default ProtectedRoutes;
