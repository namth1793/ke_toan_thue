import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const res = await api.get('/api/content');
      setContent(res.data);
    } catch (err) {
      console.error('Failed to load site content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const refreshContent = useCallback(() => {
    return fetchContent();
  }, [fetchContent]);

  return (
    <SiteContentContext.Provider value={{ content, loading, refreshContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
