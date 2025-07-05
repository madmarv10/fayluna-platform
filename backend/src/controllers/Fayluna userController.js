// backend/src/controllers/userController.js

import userService from '../services/Fayluna userService.js';

/**
 * @desc    Get a user's public profile by username
 * @route   GET /api/users/:username
 * @access  Public
 */
const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    // userService.getByUsername should return user info (excluding sensitive fields)
    const user = await userService.getByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update the authenticated user's profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // assume auth middleware populates req.user
    const { name, bio, avatarUrl, website } = req.body;

    // userService.updateProfile should return the updated user object
    const updatedUser = await userService.updateProfile(userId, {
      name,
      bio,
      avatarUrl,
      website,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Follow another user
 * @route   POST /api/users/:username/follow
 * @access  Private
 */
const followUser = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const { username: targetUsername } = req.params;

    // userService.follow should create a follow relationship
    await userService.follow(followerId, targetUsername);

    res.status(200).json({ message: `Now following ${targetUsername}` });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Unfollow a user
 * @route   POST /api/users/:username/unfollow
 * @access  Private
 */
const unfollowUser = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const { username: targetUsername } = req.params;

    // userService.unfollow should remove the follow relationship
    await userService.unfollow(followerId, targetUsername);

    res.status(200).json({ message: `Unfollowed ${targetUsername}` });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get the list of users this user is following
 * @route   GET /api/users/:username/following
 * @access  Public
 */
const getFollowing = async (req, res, next) => {
  try {
    const { username } = req.params;

    // userService.getFollowing should return an array of user profiles
    const followingList = await userService.getFollowing(username);

    res.status(200).json({ following: followingList });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get the list of followers for a user
 * @route   GET /api/users/:username/followers
 * @access  Public
 */
const getFollowers = async (req, res, next) => {
  try {
    const { username } = req.params;

    // userService.getFollowers should return an array of user profiles
    const followersList = await userService.getFollowers(username);

    res.status(200).json({ followers: followersList });
  } catch (err) {
    next(err);
  }
};

// Get the currently authenticated user's profile
const getMyProfile = async (req, res, next) => {
  try {
    const user = req.user; // set by auth middleware
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Alias exports to match route imports
const getUserProfile = getProfile;
const updateUserProfile = updateProfile;

export {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getMyProfile,
};
