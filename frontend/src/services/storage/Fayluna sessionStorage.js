// sessionStorage.js

/**
 * Save data to sessionStorage as JSON string
 * @param {string} key
 * @param {any} value
 */
function setItem(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to sessionStorage', error);
  }
}

/**
 * Get data from sessionStorage and parse from JSON string
 * @param {string} key
 * @returns {any|null} Parsed value or null if none found or error
 */
function getItem(key) {
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error reading from sessionStorage', error);
    return null;
  }
}

/**
 * Remove item from sessionStorage
 * @param {string} key
 */
function removeItem(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from sessionStorage', error);
  }
}

export {
  setItem,
  getItem,
  removeItem,
};
