import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../lib/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const logoutRef = useRef(null);

  useEffect(() => {
    if (token) {
      const saved = localStorage.getItem('admin_info');
      if (saved) setAdmin(JSON.parse(saved));
    }
  }, [token]);

  // Attach token to all API requests
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => api.interceptors.request.eject(reqInterceptor);
  }, [token]);

  // Auto-logout khi token hết hạn (401 từ bất kỳ API admin nào)
  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 && logoutRef.current) {
          logoutRef.current();
          window.location.href = '/admin/login';
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(resInterceptor);
  }, []);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    setToken(null);
    setAdmin(null);
  };

  // Giữ ref luôn trỏ đến logout mới nhất (tránh stale closure trong interceptor)
  logoutRef.current = logout;

  const login = (tokenValue, adminInfo) => {
    localStorage.setItem('admin_token', tokenValue);
    localStorage.setItem('admin_info', JSON.stringify(adminInfo));
    setToken(tokenValue);
    setAdmin(adminInfo);
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
