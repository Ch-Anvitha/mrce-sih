import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const authClient = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect if we get 401 on an endpoint other than login itself, 
    // or we could just exclude login from this logic.
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

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
