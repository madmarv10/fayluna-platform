import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 *
 * @param {*} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds before updating.
 * @returns {*} - The debounced value.
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function cancels the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
