// services/blogService.js

import Blog from '../models/Fayluna Blog.js';

const blogService = {
  async create({ title, url, photoUrl, description, authorId, tags = [], category = 'general' }) {
    try {
      const blog = new Blog({
        title,
        url,
        photoUrl,
        description,
        author: authorId,
        tags,
        category,
        status: 'published'
      });

      await blog.save();
      return blog.populate('author', 'name username avatarUrl');
    } catch (error) {
      throw error;
    }
  },

  async getAll({ page = 1, limit = 10, search = '', category = '' }) {
    try {
      const skip = (page - 1) * limit;
      let query = { status: 'published' };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      if (category) {
        query.category = category;
      }

      const blogs = await Blog.find(query)
        .populate('author', 'name username avatarUrl')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Blog.countDocuments(query);

      return {
        blogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const blog = await Blog.findById(id)
        .populate('author', 'name username avatarUrl');
      
      if (!blog) {
        throw new Error('Blog not found');
      }

      return blog;
    } catch (error) {
      throw error;
    }
  },

  async update(id, updateData, userId) {
    try {
      const blog = await Blog.findById(id);
      
      if (!blog) {
        throw new Error('Blog not found');
      }

      if (blog.author.toString() !== userId) {
        throw new Error('Not authorized to update this blog');
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('author', 'name username avatarUrl');

      return updatedBlog;
    } catch (error) {
      throw error;
    }
  },

  async delete(id, userId) {
    try {
      const blog = await Blog.findById(id);
      
      if (!blog) {
        throw new Error('Blog not found');
      }

      if (blog.author.toString() !== userId) {
        throw new Error('Not authorized to delete this blog');
      }

      await Blog.findByIdAndDelete(id);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  async search({ q, page = 1, limit = 10 }) {
    try {
      const skip = (page - 1) * limit;
      
      const blogs = await Blog.search(q)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Blog.countDocuments({
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { tags: { $in: [new RegExp(q, 'i')] } }
        ],
        status: 'published'
      });

      return {
        blogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  },

  async getByAuthor(authorId, { page = 1, limit = 10 } = {}) {
    try {
      const skip = (page - 1) * limit;
      
      const blogs = await Blog.findByAuthor(authorId)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Blog.countDocuments({ author: authorId, status: 'published' });

      return {
        blogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  }
};

export default blogService;
