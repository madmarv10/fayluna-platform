import React, { createContext, useContext, useState, useEffect } from 'react';

// Create ThemeContext with default value 'light'
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * ThemeProvider wraps app and provides theme state & toggle functionality.
 * Saves preference to localStorage for persistence.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // On mount, load saved theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  /**
   * toggleTheme
   * Switches between 'light' and 'dark' themes and saves preference
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme
 * Custom hook to consume ThemeContext easily
 */
export const useTheme = () => useContext(ThemeContext);
