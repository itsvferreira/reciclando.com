import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logohori1.png";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-content">

        {/* LOGO - ESQUERDA */}
        <div className="header-left">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        {/* MENU DESKTOP - CENTRO */}
        <nav className="menu-desktop">
          <a href="#">Início</a>
          <a href="#">Como Reciclar</a>
          <a href="#">Recicladores</a>
          <a href="#">Anúncios</a>
        </nav>

        {/* DIREITA */}
        <div className="header-right">

          <button className="btn-login">Entrar</button>

          {/* HAMBURGER */}
          <button className="menu-hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      <div 
        className={`menu-mobile-overlay ${isMenuOpen ? "active" : ""}`} 
        onClick={closeMenu}
      ></div>

      {/* MENU MOBILE */}
      <nav className={`menu-mobile ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <img src={logo} alt="logo" className="mobile-logo" />
          <button className="close-menu" onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-items">
          <a href="#" onClick={closeMenu} className="mobile-menu-link">Início</a>
          <a href="#" onClick={closeMenu} className="mobile-menu-link">Como Reciclar</a>
          <a href="#" onClick={closeMenu} className="mobile-menu-link">Recicladores</a>
          <a href="#" onClick={closeMenu} className="mobile-menu-link">Anúncios</a>

          <div className="mobile-login-container">
            <button className="btn-login-mobile">Entrar</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
