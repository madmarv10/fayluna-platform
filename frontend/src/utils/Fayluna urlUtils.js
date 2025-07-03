// urlUtils.js

/**
 * Validate if a string is a properly formatted URL
 * @param {string} urlString
 * @returns {boolean}
 */
export function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Extract the domain name from a URL
 * e.g. https://sub.example.com/page -> example.com
 * @param {string} urlString
 * @returns {string|null} domain or null if invalid
 */
export function getDomain(urlString) {
  try {
    const url = new URL(urlString);
    const hostnameParts = url.hostname.split('.');
    if (hostnameParts.length >= 2) {
      return hostnameParts.slice(-2).join('.');
    }
    return url.hostname;
  } catch {
    return null;
  }
}

/**
 * Normalize URL by ensuring it has a protocol (default https)
 * @param {string} urlString
 * @param {string} defaultProtocol - e.g. "https"
 * @returns {string|null} normalized URL or null if invalid
 */
export function normalizeUrl(urlString, defaultProtocol = 'https') {
  if (!urlString) return null;

  // Add protocol if missing
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = `${defaultProtocol}://${urlString}`;
  }

  try {
    const url = new URL(urlString);
    return url.href;
  } catch {
    return null;
  }
}

/**
 * Get query parameters as an object from a URL string
 * @param {string} urlString
 * @returns {Object} key-value pairs
 */
export function getQueryParams(urlString) {
  try {
    const url = new URL(urlString);
    const params = {};
    for (const [key, value] of url.searchParams.entries()) {
      params[key] = value;
    }
    return params;
  } catch {
    return {};
  }
}

/**
 * Append or update query parameters to a URL
 * @param {string} urlString
 * @param {Object} params - key-value pairs
 * @returns {string|null} updated URL or null if invalid
 */
export function setQueryParams(urlString, params = {}) {
  try {
    const url = new URL(urlString);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.href;
  } catch {
    return null;
  }
}

/**
 * Remove trailing slash from URL string if present
 * @param {string} urlString
 * @returns {string}
 */
export function removeTrailingSlash(urlString) {
  if (!urlString) return '';
  return urlString.replace(/\/+$/, '');
}

/**
 * Extract pathname from URL string
 * @param {string} urlString
 * @returns {string|null}
 */
export function getPathname(urlString) {
  try {
    const url = new URL(urlString);
    return url.pathname;
  } catch {
    return null;
  }
}
