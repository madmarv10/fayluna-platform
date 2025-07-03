// blogsApi.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-url.com/api';

// Fetch all blog submissions with optional pagination and filters
async function fetchBlogs({ page = 1, limit = 10, search = '' } = {}) {
  const params = new URLSearchParams({ page, limit, search });
  const response = await fetch(`${API_BASE_URL}/blogs?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch blogs');
  }

  return response.json(); // Expecting { blogs: [...], total, page, limit }
}

// Fetch a single blog by its ID
async function fetchBlogById(id) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch blog');
  }

  return response.json(); // Expecting blog object
}

// Create a new blog submission
async function createBlogSubmission({ title, url, photoUrl, description, token }) {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, url, photoUrl, description }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create blog submission');
  }

  return response.json(); // Expecting created blog object
}

// Update an existing blog submission by ID
async function updateBlogSubmission(id, { title, url, photoUrl, description, token }) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, url, photoUrl, description }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update blog submission');
  }

  return response.json(); // Expecting updated blog object
}

// Delete a blog submission by ID
async function deleteBlogSubmission(id, token) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete blog submission');
  }

  return response.json(); // Expecting success message or deleted blog info
}

// Fetch analytics data for blogs
async function fetchBlogAnalytics(token) {
  const response = await fetch(`${API_BASE_URL}/blogs/analytics`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch blog analytics');
  }

  return response.json(); // Expecting analytics data object
}

export {
  fetchBlogs,
  fetchBlogById,
  createBlogSubmission,
  updateBlogSubmission,
  deleteBlogSubmission,
  fetchBlogAnalytics,
};
