import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Shared/Layout/Layout";
import GetSalons from "./Components/GetSalons/GetSalons";
import Register from "./Components/Register/Register";
import PostSalon from "./Components/PostSalon/PostSalon";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<GetSalons />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PostSalon />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
