// backend/src/controllers/blogController.js

import blogService from '../services/Fayluna blogService.js';

/**
 * @desc    Fetch all blog submissions (with optional pagination and search)
 * @route   GET /api/blogs
 * @access  Public
 */
const getAllBlogs = async (req, res, next) => {
  try {
    // Extract pagination and search from query parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';

    // blogService.getAll should return { blogs, total, page, limit }
    const data = await blogService.getAll({ page, limit, search, category });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Fetch a single blog by ID
 * @route   GET /api/blogs/:id
 * @access  Public
 */
const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // blogService.getById should return a blog object or throw error if not found
    const blog = await blogService.getById(id);
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a new blog submission
 * @route   POST /api/blogs
 * @access  Private
 */
const createBlog = async (req, res, next) => {
  try {
    const { title, url, photoUrl, description, tags, category } = req.body;
    const userId = req.user._id; // Assume auth middleware set req.user

    // blogService.create should create and return the new blog object
    const newBlog = await blogService.create({
      title,
      url,
      photoUrl,
      description,
      authorId: userId,
      tags,
      category,
    });

    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update an existing blog submission
 * @route   PUT /api/blogs/:id
 * @access  Private
 */
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, url, photoUrl, description, tags, category } = req.body;
    const userId = req.user._id; // Assume auth middleware set req.user

    // blogService.update should check ownership and update fields
    const updatedBlog = await blogService.update(id, {
      title,
      url,
      photoUrl,
      description,
      tags,
      category,
    }, userId);

    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a blog submission
 * @route   DELETE /api/blogs/:id
 * @access  Private
 */
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Assume auth middleware set req.user

    // blogService.delete should check ownership and delete the blog
    await blogService.delete(id, userId);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Search blogs by title or description
 * @route   GET /api/blogs/search
 * @access  Public
 */
const searchBlogs = async (req, res, next) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const data = await blogService.search({ q, page, limit });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
};
