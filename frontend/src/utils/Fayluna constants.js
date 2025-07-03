// constants.js

// API Base URLs
export const API_BASE_URL = 'https://api.yourapp.com';  // Replace with your actual API URL

// Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/profile',
  },
  BLOGS: {
    GET_ALL: '/blogs',
    GET_BY_ID: (id) => `/blogs/${id}`,
    SUBMIT: '/blogs/submit',
    EDIT: (id) => `/blogs/${id}/edit`,
    DELETE: (id) => `/blogs/${id}/delete`,
  },
  USERS: {
    GET_PROFILE: (userId) => `/users/${userId}`,
    UPDATE_PROFILE: (userId) => `/users/${userId}/update`,
    FOLLOW: (userId) => `/users/${userId}/follow`,
    UNFOLLOW: (userId) => `/users/${userId}/unfollow`,
  },
  ANALYTICS: {
    GET_OVERVIEW: '/analytics/overview',
    GET_DETAILED: '/analytics/detailed',
  },
  UPLOAD: '/upload',
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9._]{3,30}$/,
  PASSWORD_COMPLEXITY: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
};

// UI Constants
export const UI = {
  MAX_IMAGE_SIZE_MB: 5,        // Max upload image size in MB
  MAX_BLOG_TITLE_LENGTH: 100,
  MAX_BLOG_DESCRIPTION_LENGTH: 300,
  ITEMS_PER_PAGE: 20,
};

// Misc
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  THEME_PREFERENCE: 'themePreference',
  USER_PROFILE: 'userProfile',
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};
