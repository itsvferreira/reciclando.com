import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HowToRecycle from "./pages/HowToRecycle";
import Login from "./pages/Login";
import Ads from "./pages/Ads";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-to-recycle" element={<HowToRecycle />} />
        <Route path="/anuncios" element={<Ads />}> </Route>
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
