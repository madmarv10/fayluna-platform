// analyticsApi.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-url.com/api';

// Fetch overall analytics summary (e.g., total views, submissions, clicks)
async function fetchAnalyticsSummary(token) {
  const response = await fetch(`${API_BASE_URL}/analytics/summary`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch analytics summary');
  }

  return response.json(); // e.g. { totalViews, totalClicks, totalSubmissions }
}

// Fetch detailed analytics data for a specific blog post or submission
async function fetchPostAnalytics(token, postId) {
  const response = await fetch(`${API_BASE_URL}/analytics/posts/${postId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch post analytics');
  }

  return response.json(); // e.g. { views, clicks, engagement, demographics }
}

// Fetch time-series analytics data for charts (e.g., daily views, clicks)
async function fetchTimeSeriesData(token, { postId, startDate, endDate }) {
  const queryParams = new URLSearchParams({
    startDate,
    endDate,
  });
  const url = postId
    ? `${API_BASE_URL}/analytics/posts/${postId}/timeseries?${queryParams}`
    : `${API_BASE_URL}/analytics/timeseries?${queryParams}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch time-series analytics data');
  }

  return response.json(); // e.g. [{ date, views, clicks }, ...]
}

// Fetch user engagement stats (likes, shares, comments) per post or overall
async function fetchEngagementStats(token, postId = null) {
  const url = postId
    ? `${API_BASE_URL}/analytics/posts/${postId}/engagement`
    : `${API_BASE_URL}/analytics/engagement`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch engagement stats');
  }

  return response.json(); // e.g. { likes, shares, comments }
}

// Fetch traffic sources data (e.g., direct, referral, social, search)
async function fetchTrafficSources(token) {
  const response = await fetch(`${API_BASE_URL}/analytics/traffic-sources`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch traffic sources');
  }

  return response.json(); // e.g. [{ source: 'direct', count: 1234 }, ...]
}

export {
  fetchAnalyticsSummary,
  fetchPostAnalytics,
  fetchTimeSeriesData,
  fetchEngagementStats,
  fetchTrafficSources,
};
