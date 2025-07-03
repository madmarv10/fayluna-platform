import { useState, useEffect, useContext, createContext } from 'react';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Core authentication logic
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fayluna_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    // Simulated API call
    if (email === 'test@fayluna.com' && password === 'password') {
      const fakeUser = { id: '1', name: 'Test User', email };
      localStorage.setItem('fayluna_user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const signup = async ({ name, email, password }) => {
    // Simulated registration API
    const fakeUser = { id: Date.now().toString(), name, email };
    localStorage.setItem('fayluna_user', JSON.stringify(fakeUser));
    setUser(fakeUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('fayluna_user');
    setUser(null);
  };

  const resetPassword = async (email) => {
    // Simulated reset
    return { success: true, message: 'Password reset email sent (simulated)' };
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  };
}
