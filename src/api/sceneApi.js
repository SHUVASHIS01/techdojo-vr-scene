import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/scene',
  withCredentials: true
});

export const saveScene = async (objects) => {
  const response = await api.post('/save', { objects });
  return response.data;
};

export const loadScene = async () => {
  const response = await api.get('/load');
  return response.data;
};
