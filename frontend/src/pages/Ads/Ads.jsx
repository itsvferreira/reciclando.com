import { useState } from 'react';
import AdCard from '../../components/AdCard/AdCard';
import LocationSelect from '../../components/LocationSelect/LocationSelect';
import Categories from '../../components/Categories/Categories';
import { useFetchAds } from '../../hooks/useFetchAds';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState('');

  useFetchAds(categories, city, setAds);

  return (
    <main>
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
  );
};

export default Ads;
