// services/notificationService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const notificationService = {
  /**
   * Fetch all notifications for the current user.
   * @returns {Promise<Array>} - List of notifications
   */
  async getNotifications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch notifications' };
    }
  },

  /**
   * Mark a specific notification as read.
   * @param {string} notificationId - ID of the notification
   * @returns {Promise<Object>} - Updated notification
   */
  async markAsRead(notificationId) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark notification as read' };
    }
  },

  /**
   * Create/send a notification.
   * @param {Object} payload - Notification details (e.g. recipient, type, message)
   * @returns {Promise<Object>} - Created notification
   */
  async sendNotification(payload) {
    try {
      const response = await axios.post(`${API_BASE_URL}/notifications`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send notification' };
    }
  }
};

export default notificationService;
