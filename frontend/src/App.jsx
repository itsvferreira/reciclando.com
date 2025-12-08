import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HowToRecycle from './pages/HowToRecycle/HowToRecycle';
import Login from './pages/Login/Login';
import Ads from './pages/Ads/Ads';
import UserProfile from './pages/UserProfile/UserProfile';
import RecyclerProfile from './pages/RecyclerProfile/RecyclerProfile';
import Recyclers from './pages/Recyclers/Recyclers';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/como-reciclar' element={<HowToRecycle />} />
        <Route path='/anuncios' element={<Ads />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/recycler-profile' element={<RecyclerProfile />} />
        <Route path='/recicladores' element={<Recyclers />} />
      </Routes>
    </Router>
  );
}

export default App;
