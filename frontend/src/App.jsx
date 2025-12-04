import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Ads from './pages/Ads';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/anuncios' element={<Ads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
