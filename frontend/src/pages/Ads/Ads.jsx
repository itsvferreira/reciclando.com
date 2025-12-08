import { useState, useEffect } from 'react';
import { adsService } from '../../services/api';
import AdCard from '../../components/AdCard/AdCard';
import LocationSelect from '../../components/LocationSelect/LocationSelect';
import Categories from '../../components/Categories/Categories';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { buildQuery } from '../../utils/buildQuery';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      let response;

      try {
        const query = buildQuery(city, categories);

        if (query.length > 0) {
          response = await adsService.search(query);
        } else {
          response = await adsService.getAll();
        }

        setAds(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
  }, [categories, city]);

  return (
    <>
    <Header />
    <main style={{ marginTop: '2rem' }}>
      <div className='container'>
        <h1>Anúncios Disponíveis</h1>
        <p>
          Encontre materiais recicláveis disponíveis para coleta na sua região
        </p>
        <div style={{ margin: '2rem 0' }}>
          <LocationSelect onCityChange={setCity} />
          <Categories
            categories={categories}
            onCategoriesChange={setCategories}
          />
        </div>
        <p style={{ marginBottom: '1.65rem' }}>
          {ads.length} resultados encontrados
        </p>
        {ads.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Ads;
