// services/emailService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const emailService = {
  async sendVerificationEmail(email, verificationToken) {
    try {
      const response = await axios.post(`${API_BASE_URL}/email/send-verification`, {
        email,
        token: verificationToken,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send verification email' };
    }
  },

  async sendPasswordResetEmail(email, resetToken) {
    try {
      const response = await axios.post(`${API_BASE_URL}/email/send-password-reset`, {
        email,
        token: resetToken,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send password reset email' };
    }
  },

  async sendNotificationEmail(email, subject, message) {
    try {
      const response = await axios.post(`${API_BASE_URL}/email/send-notification`, {
        email,
        subject,
        message,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send notification email' };
    }
  },
};

export default emailService;
