// formatters.js

/**
 * Format a Date object or date string to a human-readable format, e.g. "June 4, 2025"
 * @param {Date|string|number} dateInput
 * @param {Object} options - Intl.DateTimeFormat options (optional)
 * @returns {string}
 */
export function formatDateLong(dateInput, options = {}) {
  const date = new Date(dateInput);
  if (isNaN(date)) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/**
 * Format a Date object or date string to a short date format, e.g. "06/04/25"
 * @param {Date|string|number} dateInput
 * @returns {string}
 */
export function formatDateShort(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return '';
  return date.toLocaleDateString();
}

/**
 * Format a number as currency, e.g. 1234.56 => "$1,234.56"
 * @param {number} amount
 * @param {string} currencyCode - e.g. "USD", "EUR"
 * @param {string} locale - e.g. "en-US"
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = 'USD', locale = 'en-US') {
  if (typeof amount !== 'number') return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Format a number with thousand separators, e.g. 1234567 => "1,234,567"
 * @param {number} number
 * @param {string} locale - e.g. "en-US"
 * @returns {string}
 */
export function formatNumber(number, locale = 'en-US') {
  if (typeof number !== 'number') return '';
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Format a URL to display only the hostname, e.g. https://example.com/path -> example.com
 * @param {string} url
 * @returns {string}
 */
export function formatUrlDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch {
    return '';
  }
}

/**
 * Capitalize each word in a string, e.g. "hello world" => "Hello World"
 * @param {string} str
 * @returns {string}
 */
export function capitalizeWords(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format text to limit max length with ellipsis, e.g. truncateText("Hello world", 5) -> "He..."
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
