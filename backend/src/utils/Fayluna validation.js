// utils/validation.js

const validator = require('validator');

/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Validate a password (example: min 8 characters, one number, one special char).
 * @param {string} password
 * @returns {boolean}
 */
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};

/**
 * Validate a URL.
 * @param {string} url
 * @returns {boolean}
 */
const isValidURL = (url) => {
  return validator.isURL(url, { require_protocol: true });
};

/**
 * Validate username (example: alphanumeric, 3–20 characters).
 * @param {string} username
 * @returns {boolean}
 */
const isValidUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidURL,
  isValidUsername,
};
