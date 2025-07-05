// backend/src/models/Blog.js

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  photoUrl: {
    type: String,
    default: null
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    default: 'general'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  bookmarks: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
blogSchema.index({ author: 1, createdAt: -1 });
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });

// Virtual for getting blog's full URL
blogSchema.virtual('fullUrl').get(function() {
  return this.url;
});

// Method to increment views
blogSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to increment likes
blogSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

// Method to increment bookmarks
blogSchema.methods.incrementBookmarks = function() {
  this.bookmarks += 1;
  return this.save();
};

// Static method to find blogs by author
blogSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }).populate('author', 'name username avatarUrl');
};

// Static method to search blogs
blogSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ],
    status: 'published'
  }).populate('author', 'name username avatarUrl');
};

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
