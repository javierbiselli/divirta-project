import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Shared/Layout/Layout";
import GetSalons from "./Components/GetSalons/GetSalons";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetSalons />} />
      </Routes>
    </BrowserRouter>
  </Layout>
);
