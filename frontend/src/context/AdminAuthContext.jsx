import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));

  useEffect(() => {
    if (token) {
      const saved = localStorage.getItem('admin_info');
      if (saved) setAdmin(JSON.parse(saved));
    }
  }, [token]);

  // Attach token to all API requests
  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => api.interceptors.request.eject(interceptor);
  }, [token]);

  const login = (tokenValue, adminInfo) => {
    localStorage.setItem('admin_token', tokenValue);
    localStorage.setItem('admin_info', JSON.stringify(adminInfo));
    setToken(tokenValue);
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
