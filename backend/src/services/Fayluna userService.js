// services/userService.js

import User from '../models/Fayluna User.js';

const userService = {
  async getByUsername(username) {
    return User.findOne({ username }).select('-password -email');
  },

  async updateProfile(userId, { name, bio, avatarUrl, website }) {
    return User.findByIdAndUpdate(
      userId,
      { name, bio, avatarUrl, website },
      { new: true, runValidators: true, select: '-password -email' }
    );
  },

  async follow(followerId, targetUsername) {
    // Implement follow logic (e.g., add to Follow collection)
    // Placeholder: just return success
    return { success: true };
  },

  async unfollow(followerId, targetUsername) {
    // Implement unfollow logic (e.g., remove from Follow collection)
    // Placeholder: just return success
    return { success: true };
  },

  async getFollowing(username) {
    // Implement logic to get following list
    // Placeholder: return empty array
    return [];
  },

  async getFollowers(username) {
    // Implement logic to get followers list
    // Placeholder: return empty array
    return [];
  }
};

export default userService;
