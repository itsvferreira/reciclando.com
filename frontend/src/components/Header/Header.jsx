import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logohori1.png";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = user && user.id;
  const isComumLoggedIn = user && user.id && user.tipo === 'comum';
  const isRecicladorLoggedIn = user && user.id && user.tipo === 'reciclador';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
        <nav className="menu-desktop">
          <a onClick={() => navigate('/')} style={{cursor:'pointer'}}>Início</a>
          <a onClick={() => navigate('/como-reciclar')} style={{cursor:'pointer'}}>Como Reciclar</a>
          <a onClick={() => navigate('/recicladores')} style={{cursor:'pointer'}}>Recicladores</a>
          {isRecicladorLoggedIn && (
            <a onClick={() => navigate('/anuncios')} style={{cursor:'pointer'}}>Anúncios</a>
          )}
        </nav>
        <div className="header-right">
          {isComumLoggedIn && (
            <>
              <button className="btn-profile" onClick={() => navigate('/user-profile')}>
                <span style={{marginRight: '6px'}}><svg width="18" height="18" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></span>
                Meu Perfil
              </button>
              <button className="btn-create-ad" onClick={() => navigate('/anuncios/novo')}>+ Anúncio</button>
            </>
          )}
          {isLoggedIn ? (
            <button className="btn-logout" onClick={handleLogout}>Sair</button>
          ) : (
            <button className="btn-login" onClick={() => navigate('/login')}>Entrar</button>
          )}
          <button className="menu-hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div 
        className={`menu-mobile-overlay ${isMenuOpen ? "active" : ""}`} 
        onClick={closeMenu}
      ></div>
      <nav className={`menu-mobile ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <img src={logo} alt="logo" className="mobile-logo" />
          <button className="close-menu" onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>
        <div className="mobile-menu-items">
          <a onClick={() => {navigate('/'); closeMenu();}} className="mobile-menu-link">Início</a>
          <a onClick={() => {navigate('/como-reciclar'); closeMenu();}} className="mobile-menu-link">Como Reciclar</a>
          <a onClick={() => {navigate('/recicladores'); closeMenu();}} className="mobile-menu-link">Recicladores</a>
          {isRecicladorLoggedIn && (
            <a onClick={() => {navigate('/anuncios'); closeMenu();}} className="mobile-menu-link">Anúncios</a>
          )}

          <div className="mobile-login-container">
            {isLoggedIn ? (
              <button className="btn-logout-mobile" onClick={handleLogout}>Sair</button>
            ) : (
              <button className="btn-login-mobile" onClick={() => {navigate('/login'); closeMenu();}}>Entrar</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
