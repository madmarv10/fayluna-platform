// backend/src/controllers/analyticsController.js

import analyticsService from '../services/Fayluna analyticsService.js';

/**
 * @desc    Get overall analytics summary (total views, clicks, submissions)
 * @route   GET /api/analytics/summary
 * @access  Private
 */
const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assume auth middleware populates req.user
    // analyticsService.getSummary should return an object like { totalViews, totalClicks, totalSubmissions }
    const summary = await analyticsService.getSummary(userId);
    res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get detailed analytics for a specific blog post
 * @route   GET /api/analytics/posts/:postId
 * @access  Private
 */
const getPostAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    // analyticsService.getPostAnalytics should verify ownership and return detailed metrics
    const data = await analyticsService.getPostAnalytics(userId, postId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get time-series analytics data (e.g., daily views/clicks)
 * @route   GET /api/analytics/timeseries
 * @access  Private
 */
const getTimeSeries = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId, startDate, endDate } = req.query;
    // analyticsService.getTimeSeries should return an array of { date, views, clicks } objects
    const data = await analyticsService.getTimeSeries({
      userId,
      postId: postId || null,
      startDate,
      endDate,
    });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get engagement stats (likes, shares, comments) overall or for a specific post
 * @route   GET /api/analytics/engagement
 * @access  Private
 */
const getEngagementStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.query;
    // analyticsService.getEngagementStats should return { likes, shares, comments }
    const stats = await analyticsService.getEngagementStats(userId, postId || null);
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get traffic sources breakdown (direct, referral, social, etc.)
 * @route   GET /api/analytics/traffic-sources
 * @access  Private
 */
const getTrafficSources = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // analyticsService.getTrafficSources should return an array of { source, count } objects
    const sources = await analyticsService.getTrafficSources(userId);
    res.status(200).json(sources);
  } catch (err) {
    next(err);
  }
};

const getBlogAnalytics = getPostAnalytics;
const getPlatformAnalytics = getSummary;
const getUserAnalytics = getTimeSeries;

export {
  getBlogAnalytics,
  getUserAnalytics,
  getPlatformAnalytics,
  getEngagementStats,
  getTrafficSources,
};
