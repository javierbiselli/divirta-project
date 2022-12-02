import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import Layout from "./Components/Shared/Layout/Layout";
import GetSalons from "./Components/GetSalons/GetSalons";
import Register from "./Components/Register/Register";
import PostSalon from "./Components/PostSalon/PostSalon";
import UserProfile from "./Components/UserProfile/UserProfile";
import ProtectedRoutes from "./Components/Shared/ProtectedRoutes/ProtectedRoutes";
import Search from "./Components/Search/Search";
import SalonFull from "./Components/Shared/SalonFull/SalonFull";
import Contract from "./Components/Shared/Contract/Contract";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<GetSalons />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/post" element={<PostSalon />} />
            <Route path="/user/" element={<UserProfile />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/salons/*" element={<SalonFull />} />
          <Route path="/contract/*" element={<Contract />} />
        </Routes>
      </Layout>
    </Provider>
  </BrowserRouter>
);
