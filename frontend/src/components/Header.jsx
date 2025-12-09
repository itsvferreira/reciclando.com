import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logohori.png';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="header-left">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        {/* Menu Desktop */}
        <nav className="menu-desktop">
          <a href="#" onClick={closeMenu}>Início</a>
          <a href="#" onClick={closeMenu}>Como Reciclar</a>
          <a href="#" onClick={closeMenu}>Recicladores</a>
          <a href="#" onClick={closeMenu}>Anúncios</a>
        </nav>

        {/* Lado Direito */}
        <div className="header-right">
          <button className="btn-login">
            Entrar
          </button>
          
          {/* Menu Hamburger  */}
          <button 
            className="menu-hamburger" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile  */}
      <div className={`menu-mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      
      {/* Menu Mobile */}
      <nav className={`menu-mobile ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <img src={logo} alt="logo" className="mobile-logo" />
          <button className="close-menu" onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>
        
        <div className="mobile-menu-items">
          <a href="#" onClick={closeMenu} className="mobile-menu-link">
            Início
          </a>
          <a href="#" onClick={closeMenu} className="mobile-menu-link">
            Como Reciclar
          </a>
          <a href="#" onClick={closeMenu} className="mobile-menu-link">
            Recicladores
          </a>
          <a href="#" onClick={closeMenu} className="mobile-menu-link">
            Anúncios
          </a>
          
          <div className="mobile-login-container">
            <button className="btn-login-mobile">
              Entrar
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}