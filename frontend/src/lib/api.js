import axios from 'axios';

// In development: VITE_API_URL is empty → relative URLs → Vite proxy → localhost:5013
// In production:  VITE_API_URL=https://xxx.railway.app → absolute URLs → Railway backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export default api;
