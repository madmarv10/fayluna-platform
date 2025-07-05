// services/bookmarkService.js

import Bookmark from '../models/Fayluna Bookmark.js';
import Blog from '../models/Fayluna Blog.js';

const bookmarkService = {
  async addBookmark(userId, blogId) {
    try {
      // Check if blog exists
      const blog = await Blog.findById(blogId);
      if (!blog) {
        throw new Error('Blog not found');
      }

      // Check if bookmark already exists
      const existingBookmark = await Bookmark.findOne({
        user: userId,
        blog: blogId
      });

      if (existingBookmark) {
        throw new Error('Blog is already bookmarked');
      }

      // Create new bookmark
      const bookmark = new Bookmark({
        user: userId,
        blog: blogId
      });

      await bookmark.save();

      // Increment bookmark count on blog
      await Blog.findByIdAndUpdate(blogId, {
        $inc: { bookmarks: 1 }
      });

      return bookmark.populate([
        { path: 'user', select: 'name username avatarUrl' },
        { path: 'blog', populate: { path: 'author', select: 'name username avatarUrl' } }
      ]);
    } catch (error) {
      throw error;
    }
  },

  async removeBookmark(userId, blogId) {
    try {
      const bookmark = await Bookmark.findOneAndDelete({
        user: userId,
        blog: blogId
      });

      if (!bookmark) {
        throw new Error('Bookmark not found');
      }

      // Decrement bookmark count on blog
      await Blog.findByIdAndUpdate(blogId, {
        $inc: { bookmarks: -1 }
      });

      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  async getBookmarks(userId, { page = 1, limit = 10 } = {}) {
    try {
      const skip = (page - 1) * limit;

      const bookmarks = await Bookmark.find({ user: userId })
        .populate([
          { path: 'user', select: 'name username avatarUrl' },
          { path: 'blog', populate: { path: 'author', select: 'name username avatarUrl' } }
        ])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Bookmark.countDocuments({ user: userId });

      return {
        bookmarks,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  },

  async isBookmarked(userId, blogId) {
    try {
      const bookmark = await Bookmark.findOne({
        user: userId,
        blog: blogId
      });

      return !!bookmark;
    } catch (error) {
      throw error;
    }
  }
};

export default bookmarkService; 