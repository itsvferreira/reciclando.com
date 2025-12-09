import { useEffect } from 'react';
import { buildQuery } from '../utils/buildQuery';
import { adsService } from '../services/adsService';

export function useFetchAds(categories, city) {
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
}
