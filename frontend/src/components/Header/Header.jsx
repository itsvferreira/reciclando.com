import './Header.css';
import logo from '../../assets/logohori.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isRecycler = user.tipo === 'reciclador';
    const isDonor = user.tipo === 'comum';
    const isLoggedIn = !!user.id;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return(
        <header className="header">  
            <div className="header-left">  
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>         
            </div>

            <nav className="menu">
                <Link to="/">Início</Link>
                <Link to="/como-reciclar">Como Reciclar</Link>
                <Link to="/recicladores">Recicladores</Link>
                {isRecycler && <Link to="/anuncios">Anúncios</Link>}
            </nav>

             <div className="header-right">
                {isLoggedIn ? (
                    <>
                        {isDonor && (
                            <>
                                <Link to="/user-profile">
                                    <button className="btn-login">
                                        Meu Perfil
                                    </button>
                                </Link>
                                <button className="btn-login btn-create" onClick={() => alert('Página de criar anúncio em desenvolvimento')}>
                                    Criar Anúncio
                                </button>
                            </>
                        )}
                        {isRecycler && (
                            <Link to="/recycler-profile">
                                <button className="btn-login">
                                    Meu Perfil
                                </button>
                            </Link>
                        )}
                        <button className="btn-login logout" onClick={handleLogout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="btn-login">
                            Entrar
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
}