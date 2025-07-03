// services/uploadService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const uploadService = {
  /**
   * Upload a file (e.g., image) to the server.
   * @param {File} file - The file to upload
   * @returns {Promise<Object>} - The response data from the server, usually including file URL or ID
   */
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'File upload failed' };
    }
  },
};

export default uploadService;
