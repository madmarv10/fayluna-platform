// dateUtils.js

/**
 * Check if a given date is today
 * @param {Date|string|number} dateInput
 * @returns {boolean}
 */
export function isToday(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

/**
 * Check if a given date is yesterday
 * @param {Date|string|number} dateInput
 * @returns {boolean}
 */
export function isYesterday(dateInput) {
  const date = new Date(dateInput);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Returns how many days ago a date was from today
 * @param {Date|string|number} dateInput
 * @returns {number} number of days ago (0 if today)
 */
export function daysAgo(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Add specified number of days to a date
 * @param {Date|string|number} dateInput
 * @param {number} days
 * @returns {Date}
 */
export function addDays(dateInput, days) {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Get difference in days between two dates
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number} positive if date1 > date2, negative if date1 < date2
 */
export function diffInDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d1.getTime() - d2.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format time difference between now and given date in a "time ago" style string
 * e.g. "5 minutes ago", "2 hours ago", "3 days ago"
 * @param {Date|string|number} dateInput
 * @returns {string}
 */
export function timeAgo(dateInput) {
  const now = new Date();
  const date = new Date(dateInput);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  const days = Math.floor(seconds / 86400);
  return days === 1 ? '1 day ago' : `${days} days ago`;
}

/**
 * Parse ISO 8601 date string safely
 * @param {string} isoString
 * @returns {Date|null}
 */
export function parseISODate(isoString) {
  const date = new Date(isoString);
  return isNaN(date) ? null : date;
}
