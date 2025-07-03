// utils/encryption.js

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/**
 * Hash a plain-text password.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error('Failed to hash password');
  }
};

/**
 * Compare a plain-text password with a hashed password.
 * @param {string} password - The plain-text password.
 * @param {string} hash - The hashed password.
 * @returns {Promise<boolean>} - True if they match, false otherwise.
 */
const comparePasswords = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error('Failed to compare passwords');
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
};
