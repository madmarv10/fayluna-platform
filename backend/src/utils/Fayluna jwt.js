// utils/jwt.js

const jwt = require('jsonwebtoken');
const logger = require('./logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d'; // e.g. "1h", "7d", etc.

/**
 * Generate a JWT token for a given payload.
 * @param {Object} payload - Data to encode in the token (e.g., user id).
 * @returns {String} - Signed JWT token.
 */
const generateToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  } catch (err) {
    logger.error('Error generating token', err);
    throw err;
  }
};

/**
 * Verify a JWT token and return its decoded payload.
 * @param {String} token - JWT token.
 * @returns {Object} - Decoded payload.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    logger.warn('Invalid or expired token');
    throw err;
  }
};

/**
 * Decode a JWT token without verifying signature (use carefully).
 * @param {String} token - JWT token.
 * @returns {Object|null} - Decoded payload or null.
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    logger.warn('Failed to decode token');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
