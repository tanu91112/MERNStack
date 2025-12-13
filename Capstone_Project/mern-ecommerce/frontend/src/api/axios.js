import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

console.log('API Base URL:', API.defaults.baseURL);

// Add request interceptor to log requests
API.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
API.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default API;