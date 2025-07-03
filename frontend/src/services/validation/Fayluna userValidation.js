// userValidation.js

/**
 * Validate username
 * - Required
 * - Between 3 and 30 characters
 * - Only letters, numbers, underscores, and dots allowed
 * @param {string} username
 * @returns {string|null} Error message or null if valid
 */
function validateUsername(username) {
  if (!username) return 'Username is required';
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (username.length > 30) return 'Username cannot exceed 30 characters';
  if (!/^[a-zA-Z0-9._]+$/.test(username)) {
    return 'Username can only contain letters, numbers, dots, and underscores';
  }
  return null;
}

/**
 * Validate email address
 * - Required
 * - Must be a valid email format
 * @param {string} email
 * @returns {string|null} Error message or null if valid
 */
function validateEmail(email) {
  if (!email) return 'Email is required';
  // Simple email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
}

/**
 * Validate password
 * - Required
 * - Minimum 8 characters
 * - Must contain at least one uppercase letter, one lowercase letter, one number, and one special character
 * @param {string} password
 * @returns {string|null} Error message or null if valid
 */
function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
  return null;
}

/**
 * Validate confirm password
 * - Must match password
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|null} Error message or null if valid
 */
function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
}

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
};
