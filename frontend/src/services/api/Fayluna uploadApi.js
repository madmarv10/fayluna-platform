// uploadApi.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-url.com/api';

/**
 * Upload a file (e.g., image) to the server.
 * @param {File} file - The file to upload.
 * @param {string} token - Authentication token (Bearer).
 * @returns {Promise<Object>} - The response data with file URL or metadata.
 */
async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Do NOT set Content-Type header manually with FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'File upload failed');
  }

  return response.json(); 
  // Expected to return something like: { url: 'https://cdn.example.com/uploads/abc123.jpg', id: 'abc123', ... }
}

export {
  uploadFile,
};
