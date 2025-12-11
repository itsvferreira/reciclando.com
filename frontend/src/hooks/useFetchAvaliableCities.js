import { useEffect } from 'react';
import { addressService } from '../services/api';

export function useFetchAvaliableCities(setCitiesOptions, setLoading) {
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await addressService.getCities();
        const citiesOptions = response.data.map((c) => ({
          label: c,
          value: c,
        }));
        citiesOptions.sort((city) => city.label);
        setCitiesOptions(citiesOptions);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, [setCitiesOptions]);
}
