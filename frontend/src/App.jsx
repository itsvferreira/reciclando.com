import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HowToRecycle from "./pages/HowToRecycle/HowToRecycle";
import Login from "./pages/Login/Login";
import Ads from "./pages/Ads/Ads";
import UserProfile from "./pages/UserProfile/UserProfile";
import RecyclerProfile from "./pages/RecyclerProfile/RecyclerProfile";
import Recyclers from "./pages/Recyclers/Recyclers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-to-recycle" element={<HowToRecycle />} />
        <Route path="/anuncios" element={<Ads />} />
        <Route path="/Ads" element={<Ads />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/recycler-profile" element={<RecyclerProfile />} />
        <Route path="/recyclers" element={<Recyclers />} />
      </Routes>
    </Router>
  );
}

export default App;
