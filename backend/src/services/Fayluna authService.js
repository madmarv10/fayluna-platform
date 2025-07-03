// services/authService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      // Store token in localStorage or cookies as needed
      localStorage.setItem('authToken', token);
      return user;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  async signup(name, email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, { name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return user;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    // Optionally, call backend logout endpoint if needed
  },

  getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    // Decode token or get user info from storage or API
    // For simplicity, you might want to fetch user details from API here
    return null; // placeholder, implement as needed
  },

  async refreshToken() {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      this.logout();
      throw error.response?.data || { message: 'Token refresh failed' };
    }
  }
};

export default authService;
