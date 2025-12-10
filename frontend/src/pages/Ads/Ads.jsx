import { useState } from 'react';
import AdCard from '../../components/AdCard/AdCard';
import LocationSelect from '../../components/LocationSelect/LocationSelect';
import Categories from '../../components/Categories/Categories';
import { useFetchAds } from '../../hooks/useFetchAds';
import { getCitiesOptions } from '../../utils/getCitiesOptions';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [citiesOptions, setCitiesOptions] = useState([]);

  useFetchAds(categories, city, setAds, setLoading);

  if (!loading && citiesOptions.length == 0) {
    const options = getCitiesOptions(ads);
    setCitiesOptions(options);
  }

  return (
    <main>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className='container'>
          <h1>Anúncios Disponíveis</h1>
          <p>
            Encontre materiais recicláveis disponíveis para coleta na sua região
          </p>
          <div style={{ margin: '2rem 0' }}>
            <LocationSelect onCityChange={setCity} options={citiesOptions} />
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
      )}
    </main>
  );
};

export default Ads;
