// backend/src/controllers/authController.js

import authService from '../services/Fayluna authService.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // authService.signup should create the user and return { user, token }
    const { user, token } = await authService.signup({ name, email, password });
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Log in existing user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // authService.login should validate credentials and return { user, token }
    const { user, token } = await authService.login({ email, password });
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Log out user (invalidate token or clear session)
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    // authService.logout should handle token invalidation if needed
    await authService.logout(token);
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Send password reset email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // authService.sendPasswordResetEmail should generate a reset token & email it
    await authService.sendPasswordResetEmail(email);
    res.status(200).json({ message: 'Password reset link sent if email exists' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Reset user password using token
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    // authService.resetPassword should verify token and update password
    await authService.resetPassword({ token, newPassword });
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    next(err);
  }
};

export {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
