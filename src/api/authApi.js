import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/auth',
  withCredentials: true
});

export const signup = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/me');
  return response.data;
};
