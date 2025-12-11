import { useEffect } from 'react';
import { addressService } from '../services/api';

export function useFetchAvaliableNeighbors(
  city,
  setNeigboorOptions,
  setLoading
) {
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await addressService.getNeighborhoodsByCity(city);
        const neighborOptions = response.data.map((c) => ({
          label: c,
          value: c,
        }));
        neighborOptions.sort((n) => n.label);
        setNeigboorOptions(neighborOptions);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNeighborhoods();
  }, [city, setNeigboorOptions, setLoading]);
}
