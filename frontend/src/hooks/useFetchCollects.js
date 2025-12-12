import { useEffect } from 'react';
import { adsService } from '../services/api';

export function useFetchCollects(user, setCollects) {
  useEffect(() => {
    const fetchCollects = async () => {
      if (user && user.code) {
        try {
          // Buscar histórico de coletas do reciclador logado
          const response = await adsService.getHistoryByRecyclerCode(user.code);
          const mappedCollects = response.data.map((ad) => ({
            id: ad.id,
            title: ad.title,
            description: ad.description,
            material: ad.category?.[0] || 'N\u00e3o especificado',
            location:
              [ad.city, ad.state].filter(Boolean).join(', ') ||
              'N\u00e3o especificado',
            date: new Date(ad.createdAt).toLocaleDateString('pt-BR'),
            status: ad.status,
            image:
              ad.imagesPath && ad.imagesPath.length > 0
                ? ad.imagesPath[0]
                : 'https://via.placeholder.com/150',
          }));
          setCollects(mappedCollects);
        } catch (error) {
          console.error('Erro ao buscar coletas:', error);
          setCollects([]);
        }
      }
    };
    fetchCollects();
  }, [user]);
}
