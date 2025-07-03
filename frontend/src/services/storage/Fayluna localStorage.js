// localStorage.js

/**
 * Save data to localStorage as JSON string
 * @param {string} key
 * @param {any} value
 */
function setItem(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

/**
 * Get data from localStorage and parse from JSON string
 * @param {string} key
 * @returns {any|null} Parsed value or null if none found or error
 */
function getItem(key) {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return null;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key
 */
function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
}

export {
  setItem,
  getItem,
  removeItem,
};
