import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HowToRecycle from "./pages/HowToRecycle";
import Login from "./pages/Login";
// import Ads from "./pages/Ads";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-to-recycle" element={<HowToRecycle />} />
        <Route path="/anuncios" element={<Ads />}> </Route>
      </Routes>
    </Router>
  );
}

export default App;
