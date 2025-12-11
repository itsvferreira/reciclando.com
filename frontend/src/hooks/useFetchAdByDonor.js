import { useEffect } from 'react';
import { adsService } from '../services/api';

export function useFetchAdByDonor(user, setAds, setIsLoading) {
  useEffect(() => {
    const fetchAdByDonor = async () => {
      if (user && user.id) {
        try {
          const response = await adsService.getByDonor(user.id);

          const mappedAds = response.data.map((ad) => ({
            id: ad.id,
            title: ad.title,
            description: ad.description,
            material: ad.category?.[0] || 'N\u00e3o especificado',
            location:
              [ad.city, ad.state].filter(Boolean).join(', ') ||
              'N\u00e3o especificado',
            date: new Date(ad.createdAt).toLocaleDateString('pt-BR'),
            status: ad.status || 'active',
            image:
              ad.imagesPath && ad.imagesPath.length > 0
                ? ad.imagesPath[0]
                : 'https://via.placeholder.com/150',
          }));
          setAds(mappedAds);
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao buscar anúncios:', error);
          setAds([]);
        }
      }
    };

    fetchAdByDonor();
  }, [user, setAds, setIsLoading]);
}
