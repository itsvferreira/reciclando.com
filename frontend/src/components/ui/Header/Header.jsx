import './Header.css'; 
import logo from '../assets/logohori.png';

export default function Header(){
    return(
        <header className="header">  
            <div className="header-left">  
                <img src={logo} alt="logo" />         
            </div>

            <nav className="menu">
                <a href="#">Início</a>
                <a href="#">Como Reciclar</a>
                <a href="#">Recicladores</a>
                <a href="#">Anúncios</a>
            </nav>

             <div className="header-right">
                <button className="btn-login">
                    Entrar
                </button>
            </div>
        </header>
    );
}