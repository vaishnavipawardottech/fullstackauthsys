import axios from 'axios';

// Use Vite env var in frontend: VITE_API_URL. Falls back to localhost for local dev.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send/receive httpOnly cookies for refresh-token
});

export default api;
