import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Page from "./Page";
import LoginPage from "./pages/Login";
import Courses from "./pages/Courses";
import Halfyear from "./pages/Halfyear";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Courses />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/halfyear" element={<Halfyear />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);