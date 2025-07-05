// backend/src/models/Bookmark.js

import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, blog: 1 }, { unique: true });

// Virtual for getting bookmark's full URL
bookmarkSchema.virtual('bookmarkUrl').get(function() {
  return `/bookmarks/${this._id}`;
});

// Static method to check if user has bookmarked a blog
bookmarkSchema.statics.hasBookmarked = function(userId, blogId) {
  return this.exists({ user: userId, blog: blogId });
};

// Static method to get bookmark count for a blog
bookmarkSchema.statics.getBookmarkCount = function(blogId) {
  return this.countDocuments({ blog: blogId });
};

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;
