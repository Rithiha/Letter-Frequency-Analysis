import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import SubmitArticle from "./components/SubmitArticle";
import SubmitPage from "./components/SubmitPage";
import ArticleDetail from "./components/ArticleDetails";
import EditArticle from "./components/EditArticle";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-article/:id" element={<ArticleDetail />} />
        <Route path="/upload-article" element={<SubmitPage />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
