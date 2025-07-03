// usersApi.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-url.com/api';

// Register a new user
async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register user');
  }

  return response.json(); // Expecting user data and token
}

// Login user
async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to login');
  }

  return response.json(); // Expecting user data and token
}

// Get current user's profile
async function fetchUserProfile(token) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user profile');
  }

  return response.json(); // Expecting user profile data
}

// Update current user's profile
async function updateUserProfile(token, { username, email, photoUrl }) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email, photoUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }

  return response.json(); // Expecting updated user profile
}

// Request password reset (send reset email)
async function requestPasswordReset(email) {
  const response = await fetch(`${API_BASE_URL}/users/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to request password reset');
  }

  return response.json(); // Expecting success message
}

// Reset password with token
async function resetPassword(token, newPassword) {
  const response = await fetch(`${API_BASE_URL}/users/password-reset/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to reset password');
  }

  return response.json(); // Expecting success message
}

export {
  registerUser,
  loginUser,
  fetchUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
};
