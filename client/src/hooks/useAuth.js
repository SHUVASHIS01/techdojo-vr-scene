import { useState, useEffect } from 'react';
import * as authApi from '../api/authApi';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.getMe()
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    return data;
  };

  const signup = async (userData) => {
    const data = await authApi.signup(userData);
    return data;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return { user, login, signup, logout, loading };
}
