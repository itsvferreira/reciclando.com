import { use, useState } from 'react';
import RecyclerCard from '../../components/RecyclerCard/RecyclerCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LocationSelect from '../../components/LocationSelect/LocationSelect';
import Categories from '../../components/Categories/Categories';
import styles from './Recycler.module.css';
import { useFetchRecyclers } from '../../hooks/useFetchRecyclers';
import { useFetchAvaliableCities } from '../../hooks/useFetchAvaliableCities';
import { useFetchAvaliableNeighbors } from '../../hooks/useFetchAvaliableNeighbors';
import { user } from '../../utils/loggedUsers';

const Recyclers = () => {
  const userCity = user ? user.city : '';
  const userNeighboorhood = user ? user.neighboorhood : '';

  const [recyclers, setRecyclers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState(userCity);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [neighboorhood, setNeighboorhood] = useState(userNeighboorhood);
  const [neigboorOptions, setNeigboorOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFetchRecyclers(categories, city, neighboorhood, searchText, setRecyclers);

  useFetchAvaliableCities(setCitiesOptions, setLoading);
  const cityIdx = citiesOptions.findIndex((c) => c.value === city);

  useFetchAvaliableNeighbors(city, setNeigboorOptions, setLoading);
  const neighboorIdx = neigboorOptions.findIndex(
    (n) => n.value === neighboorhood
  );

  return (
    <main style={{ marginTop: '2rem' }}>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className='container'>
          <h1>Recicladores</h1>
          <p>Encontre recicladores próximos a você</p>
          <div style={{ margin: '2rem 0' }}>
            <SearchBar
              placeholder='Buscar por nome...'
              onSearchChange={setSearchText}
            />
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
          <p style={{ marginBottom: '1.65rem' }}>
            {recyclers.length} recicladores encontrados
          </p>
          <div className={styles['recycler-grid']}>
            {recyclers.map((rec, id) => (
              <RecyclerCard key={rec.userId} {...rec} id={id + 1} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Recyclers;
