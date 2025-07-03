// services/blogService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const blogService = {
  async createBlog(blogData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_BASE_URL}/blogs`, blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit blog' };
    }
  },

  async getAllBlogs(params = {}) {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load blogs' };
    }
  },

  async getBlogById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load blog' };
    }
  },

  async updateBlog(id, updatedData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update blog' };
    }
  },

  async deleteBlog(id) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete blog' };
    }
  },

  async getMyBlogs() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/blogs/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user blogs' };
    }
  },

  async getAnalytics(id) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/blogs/${id}/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load blog analytics' };
    }
  },
};

export default blogService;
