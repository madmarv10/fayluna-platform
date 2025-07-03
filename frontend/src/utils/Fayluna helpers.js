// helpers.js

/**
 * Format a date to a readable string, e.g. "Jun 4, 2025"
 * @param {Date|string|number} dateInput - Date object or date string/number
 * @param {Object} options - Intl.DateTimeFormat options (optional)
 * @returns {string} formatted date string
 */
export function formatDate(dateInput, options) {
  const date = new Date(dateInput);
  if (isNaN(date)) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

/**
 * Validate if a string is a properly formatted URL
 * @param {string} url 
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Truncate a string to a max length and append ellipsis if needed
 * @param {string} str 
 * @param {number} maxLength 
 * @returns {string}
 */
export function truncateText(str, maxLength) {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

/**
 * Extract domain name from a URL string, e.g. https://blog.example.com -> example.com
 * @param {string} url 
 * @returns {string}
 */
export function extractDomain(url) {
  try {
    const { hostname } = new URL(url);
    // Optionally remove subdomains, keep main domain + TLD
    const parts = hostname.split('.');
    if (parts.length > 2) {
      return parts.slice(parts.length - 2).join('.');
    }
    return hostname;
  } catch {
    return '';
  }
}

/**
 * Generate a simple unique ID string (not UUID but good for keys, temp ids)
 * @returns {string}
 */
export function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Convert a file size in bytes to a human readable string, e.g. "2.5 MB"
 * @param {number} bytes 
 * @param {number} decimals 
 * @returns {string}
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Scroll smoothly to an element by ID
 * @param {string} elementId 
 */
export function scrollToElementById(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Debounce a function call - useful for search inputs, resize, etc.
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Capitalize the first letter of a string
 * @param {string} str 
 * @returns {string}
 */
export function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
