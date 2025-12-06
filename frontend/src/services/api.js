import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/v1';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const adsService = {
  getAll: () => api.get('/ads'),
  getById: (id) => api.get(`/ads/${id}`),
  getByDonor: (donorId) => api.get(`/ads/donor/${donorId}`),
  create: (data) => api.post('/ads', data),
  delete: (id) => api.delete(`/ads/${id}`),
  conclude: (id, recyclerCode) => api.patch(`/ads/${id}/conclude?recyclerCode=${recyclerCode}`),
  search: (params) => api.get(`/ads?${params}`),
};

export const recyclersService = {
  getAll: () => api.get('/recyclers'),
  search: (params) => api.get(`/recyclers?${params}`),
};

export default api;
