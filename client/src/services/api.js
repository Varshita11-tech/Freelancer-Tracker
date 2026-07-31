import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
// A deployed backend may be configured as either its origin or its /api URL.
// Normalise both forms so every request reaches the Express API routes.
const baseURL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api') ? configuredApiUrl : configuredApiUrl + '/api')
  : '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ft-token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercept responses to handle auth errors globally
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('ft-token');
    localStorage.removeItem('ft-user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
