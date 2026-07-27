import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const authClient = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginAdmin = async (credentials) => {
  const response = await authClient.post('/login', credentials);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await authClient.post('/logout');
  return response.data;
};

export const fetchCurrentAdmin = async () => {
  const response = await authClient.get('/me');
  return response.data;
};
