import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HowToRecycle from './pages/HowToRecycle/HowToRecycle';
import Login from './pages/Login/Login';
import Ads from './pages/Ads/Ads';
import UserProfile from './pages/UserProfile/UserProfile';
import RecyclerProfile from './pages/RecyclerProfile/RecyclerProfile';
import Recyclers from './pages/Recyclers/Recyclers';
import AdCreation from './pages/AdCreation/AdCreation';
import AdUpdate from './pages/AdUpdate/AdUpdate';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { isComumLoggedIn } from './utils/loggedUsers';
import RecyclerInformations from './pages/RecyclerInformations/RecyclerInformations';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/como-reciclar' element={<HowToRecycle />} />
        <Route path='/anuncios' element={<Ads />} />
        <Route path='/anuncios/novo' element={<AdCreation />} />
        <Route path='/anuncios/edicao/:id' element={<AdUpdate />} />
        <Route
          path='/@me'
          element={isComumLoggedIn ? <UserProfile /> : <RecyclerProfile />}
        />
        <Route path='/recicladores' element={<Recyclers />} />
        <Route path='/reciclador-informacoes/:id' element={<RecyclerInformations />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
