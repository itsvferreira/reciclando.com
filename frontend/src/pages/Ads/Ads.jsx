import { useEffect, useState } from 'react';
import AdCard from '../../components/AdCard/AdCard';
import LocationSelect from '../../components/LocationSelect/LocationSelect';
import Categories from '../../components/Categories/Categories';
import { useFetchAds } from '../../hooks/useFetchAds';
import { useFetchAvaliableCities } from '../../hooks/useFetchAvaliableCities';
import { useFetchAvaliableNeighbors } from '../../hooks/useFetchAvaliableNeighbors';
import { user } from '../../utils/loggedUsers';

const Ads = () => {
  const userCity = user ? user.city : '';
  const userNeighboorhood = user ? user.neighboorhood : '';

  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState(userCity);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [neighboorhood, setNeighboorhood] = useState(userNeighboorhood);
  const [neigboorOptions, setNeigboorOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFetchAds(categories, city, neighboorhood, setAds);
  useFetchAvaliableCities(setCitiesOptions, setLoading);

  const activeAds = ads.filter((ad) => ad.status === 'active');
  const cityIdx = citiesOptions.findIndex((c) => c.value === city);

  useFetchAvaliableNeighbors(city, setNeigboorOptions, setLoading);
  const neighboorIdx = neigboorOptions.findIndex(
    (n) => n.value === neighboorhood
  );

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
            <div className='d-flex gap-4'>
              <LocationSelect
                onCityChange={setCity}
                options={citiesOptions}
                initialValue={citiesOptions[cityIdx]}
                placeholder='Selecione uma cidade'
              />
              {city && (
                <LocationSelect
                  onCityChange={setNeighboorhood}
                  options={neigboorOptions}
                  initialValue={neigboorOptions[neighboorIdx]}
                  placeholder='Selecione um bairro'
                />
              )}
            </div>
            <Categories
              categories={categories}
              onCategoriesChange={setCategories}
            />
          </div>
          {activeAds.length === 0 ? (
            <p>Nenhum resultado encontrado</p>
          ) : (
            <p style={{ marginBottom: '1.65rem' }}>
              {activeAds.length} resultados encontrados
            </p>
          )}
          {activeAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Ads;
