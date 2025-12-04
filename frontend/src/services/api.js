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
  create: (data) => api.post('/ads', data),
  search: (params) => api.get(`/ads?${params}`),
};

export default api;
