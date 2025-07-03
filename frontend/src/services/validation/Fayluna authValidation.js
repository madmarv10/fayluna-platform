// authValidation.js

/**
 * Validate email format
 * @param {string} email
 * @returns {string|null} Error message or null if valid
 */
function validateEmail(email) {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
}

/**
 * Validate password strength
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * @param {string} password
 * @returns {string|null} Error message or null if valid
 */
function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
}

/**
 * Validate username
 * - Required
 * - 3 to 20 characters
 * - Alphanumeric and underscores only
 * @param {string} username
 * @returns {string|null} Error message or null if valid
 */
function validateUsername(username) {
  if (!username) return 'Username is required';
  if (username.length < 3 || username.length > 20)
    return 'Username must be between 3 and 20 characters';
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username))
    return 'Username can only contain letters, numbers, and underscores';
  return null;
}

/**
 * Validate password confirmation matches password
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|null} Error message or null if valid
 */
function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
}

export {
  validateEmail,
  validatePassword,
  validateUsername,
  validateConfirmPassword,
};
