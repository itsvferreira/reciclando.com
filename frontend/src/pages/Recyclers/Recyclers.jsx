import { useState, useEffect } from 'react';
import { recyclersService } from '../../services/api';
import RecyclerCard from '../../components/RecyclerCard/RecyclerCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LocationSelect from '../../components/LocationSelect/LocationSelect';
import Categories from '../../components/Categories/Categories';
import { buildQuery } from '../../utils/buildQuery';

const Recyclers = () => {
  const [recyclers, setRecyclers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchRecyclers = async () => {
      let response;

      try {
        const query = buildQuery(city, categories, searchText);

        console.log(query);

        if (query.length > 0) {
          response = await recyclersService.search(query);
        } else {
          response = await recyclersService.getAll();
        }

        setRecyclers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecyclers();
  }, [categories, city, searchText]);

  return (
    <main>
      <div className='container'>
        <h1>Recicladores</h1>
        <p>Encontre recicladores próximos a você</p>
        <div style={{ margin: '2rem 0' }}>
          <SearchBar
            placeholder='Buscar por nome...'
            onSearchChange={setSearchText}
          />
          <LocationSelect onCityChange={setCity} />
          <Categories
            categories={categories}
            onCategoriesChange={setCategories}
          />
        </div>
        <p style={{ marginBottom: '1.65rem' }}>
          {recyclers.length} recicladores encontrados
        </p>
        <div class='row row-cols-1 row-cols-md-3 g-4'>
          {recyclers.map((rec) => (
            <RecyclerCard key={rec.userId} {...rec} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Recyclers;
