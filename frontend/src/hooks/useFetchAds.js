import { useEffect } from 'react';
import { buildQuery } from '../utils/buildQuery';
import { adsService } from '../services/api';

export function useFetchAds(categories, city, setAds, setLoading) {
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
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
  }, [categories, city, setAds, setLoading]);
}
