// backend/src/controllers/bookmarkController.js

import bookmarkService from '../services/Fayluna bookmarkService.js';

/**
 * @desc    Get all bookmarks for the authenticated user
 * @route   GET /api/bookmarks
 * @access  Private
 */
const getUserBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id; // assume auth middleware sets req.user
    // bookmarkService.getUserBookmarks should return an array of bookmark objects
    const bookmarks = await bookmarkService.getUserBookmarks(userId);
    res.status(200).json({ bookmarks });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Add a new bookmark for the authenticated user
 * @route   POST /api/bookmarks
 * @access  Private
 */
const addBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body; // expect { postId: string }

    // bookmarkService.addBookmark should create and return the new bookmark
    const newBookmark = await bookmarkService.addBookmark(userId, postId);
    res.status(201).json({ bookmark: newBookmark });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Remove a bookmark for the authenticated user
 * @route   DELETE /api/bookmarks/:postId
 * @access  Private
 */
const removeBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    // bookmarkService.removeBookmark should delete the bookmark
    await bookmarkService.removeBookmark(userId, postId);
    res.status(200).json({ message: 'Bookmark removed successfully' });
  } catch (err) {
    next(err);
  }
};

const getBookmarks = getUserBookmarks;

export {
  getBookmarks,
  addBookmark,
  removeBookmark,
};
