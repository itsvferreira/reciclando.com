import { useEffect } from 'react';
import { adsService } from '../services/api';

export function useFetchAd(id, setFormData, setCategories) {
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await adsService.getById(id);
        setFormData(response.data);
        setCategories(response.data.category);
      } catch (error) {
        console.error('Erro ao buscar dados do anúncio:', error);
      }
    };

    fetchData();
  }, [id, setFormData, setCategories]);
}
