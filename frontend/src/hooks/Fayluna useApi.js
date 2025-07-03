import { useState } from 'react';

// Base URL of your API (customize this)
const API_BASE_URL = 'https://api.fayluna.com'; // Or use environment variables

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => {
    const user = localStorage.getItem('fayluna_user');
    return user ? JSON.parse(user).token : null;
  };

  const request = async (method, endpoint, body = null, customHeaders = {}) => {
    setLoading(true);
    setError(null);

    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Public API methods
  const get = (endpoint) => request('GET', endpoint);
  const post = (endpoint, body) => request('POST', endpoint, body);
  const put = (endpoint, body) => request('PUT', endpoint, body);
  const del = (endpoint) => request('DELETE', endpoint);

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};

export default useApi;
