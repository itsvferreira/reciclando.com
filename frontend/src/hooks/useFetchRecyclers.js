import { buildQuery } from '../utils/buildQuery';
import { useEffect } from 'react';
import { recyclersService } from '../services/api';

export function useFetchRecyclers(
  categories,
  city,
  searchText,
  neighboorhood,
  setRecyclers
) {
  useEffect(() => {
    const fetchRecyclers = async () => {
      let response;

      try {
        const query = buildQuery(city, categories, neighboorhood, searchText);

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
  }, [categories, city, neighboorhood, searchText, setRecyclers]);
}
