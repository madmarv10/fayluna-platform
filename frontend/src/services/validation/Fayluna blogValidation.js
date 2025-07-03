// blogValidation.js

/**
 * Validate blog title
 * - Required
 * - Between 5 and 100 characters
 * @param {string} title
 * @returns {string|null} Error message or null if valid
 */
function validateTitle(title) {
  if (!title) return 'Title is required';
  if (title.length < 5) return 'Title must be at least 5 characters';
  if (title.length > 100) return 'Title cannot exceed 100 characters';
  return null;
}

/**
 * Validate blog URL
 * - Required
 * - Must be a valid URL format
 * @param {string} url
 * @returns {string|null} Error message or null if valid
 */
function validateUrl(url) {
  if (!url) return 'URL is required';
  try {
    // Check if valid URL
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL format';
  }
}

/**
 * Validate description
 * - Optional
 * - Maximum 500 characters
 * @param {string} description
 * @returns {string|null} Error message or null if valid
 */
function validateDescription(description) {
  if (description && description.length > 500) {
    return 'Description cannot exceed 500 characters';
  }
  return null;
}

/**
 * Validate image URL (optional)
 * - If provided, must be a valid URL ending with common image extensions
 * @param {string} imageUrl
 * @returns {string|null} Error message or null if valid
 */
function validateImageUrl(imageUrl) {
  if (!imageUrl) return null;
  try {
    const url = new URL(imageUrl);
    if (!/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url.pathname)) {
      return 'Image URL must end with a valid image extension (jpeg, jpg, png, gif, etc.)';
    }
    return null;
  } catch {
    return 'Invalid image URL format';
  }
}

export {
  validateTitle,
  validateUrl,
  validateDescription,
  validateImageUrl,
};
