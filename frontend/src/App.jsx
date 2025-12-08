import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HowToRecycle from './pages/HowToRecycle/HowToRecycle';
import Login from './pages/Login/Login';
import Ads from './pages/Ads/Ads';
import UserProfile from './pages/UserProfile/UserProfile';
import RecyclerProfile from './pages/RecyclerProfile/RecyclerProfile';
import Recyclers from './pages/Recyclers/Recyclers';
import AdCreation from './pages/AdCreation/AdCreation';
import AdUpdate from './pages/AdUpdate/AdUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/anuncios' element={<Ads />} />
        <Route path='/anuncios/novo' element={<AdCreation />} />
        <Route path='/anuncios/edicao/:id' element={<AdUpdate />} />'
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/recycler-profile' element={<RecyclerProfile />} />
        <Route path='/recicladores' element={<Recyclers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/como-reciclar' element={<HowToRecycle />} />
      </Routes>
    </Router>
  );
}

export default App;
