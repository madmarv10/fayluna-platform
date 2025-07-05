// services/authService.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Fayluna User.js';
import { sendEmail } from './Fayluna emailService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const authService = {
  async signup({ name, email, password }) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      return { user: userResponse, token };
    } catch (error) {
      throw error;
    }
  },

  async login({ email, password }) {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      return { user: userResponse, token };
    } catch (error) {
      throw error;
    }
  },

  async logout(token) {
    // In a simple implementation, we just return success
    // In a more complex setup, you might want to blacklist the token
    return { success: true };
  },

  async sendPasswordResetEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        // Don't reveal if user exists or not
        return { success: true };
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Store reset token in user document (you might want to add a field for this)
      // For now, we'll just send the email

      // Send email
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      
      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset Request</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });

      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  async resetPassword({ token, newPassword }) {
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Find user
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('Invalid reset token');
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      user.password = hashedPassword;
      await user.save();

      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser(userId) {
    try {
      const user = await User.findById(userId).select('-password');
      return user;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;
