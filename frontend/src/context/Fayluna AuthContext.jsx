import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext with default empty value
const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  loading: false,
  error: null,
});

/**
 * AuthProvider component wraps your app and provides authentication state.
 * Handles login, logout, and user persistence.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // User info object
  const [token, setToken] = useState(null);     // Auth token string
  const [loading, setLoading] = useState(true); // Loading auth status on mount
  const [error, setError] = useState(null);     // Error message if login fails

  // On mount, check if token + user info is saved in localStorage to persist login
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    const savedToken = localStorage.getItem('authToken');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  /**
   * login
   * Perform login with API call, set user and token on success
   * @param {string} email
   * @param {string} password
   * @returns {boolean} success
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Login failed');
      }
      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Login error');
      setLoading(false);
      return false;
    }
  };

  /**
   * logout
   * Clears user and token from state and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth
 * Custom hook to consume AuthContext easily
 */
export const useAuth = () => useContext(AuthContext);
