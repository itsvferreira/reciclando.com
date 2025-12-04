import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HowToRecycle from "./pages/HowToRecycle";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-to-recycle" element={<HowToRecycle />} />
      </Routes>
    </Router>
  );
}

export default App;
