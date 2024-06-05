import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPage";
import ThemeContextWrapper from "./context/ThemeContextWrapper";

ReactDOM.render(
  <ThemeContextWrapper>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </Router>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
