import { useEffect } from 'react';
import axios from 'axios';

export function useViaCep(postalCode, setAddress, setIsValidPostalCode) {
  useEffect(() => {
    const code = postalCode?.replace(/\D/g, '');
    if (!code.trim() || code.length !== 8) {
      setAddress({});
      return;
    }

    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${postalCode}/json/`
        );

        if (response.data.erro == 'true') {
          setIsValidPostalCode(false);
        } else {
          setAddress(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
      }
    };

    if (postalCode) {
      fetchAddress();
    }
  }, [postalCode, setAddress, setIsValidPostalCode]);
}
