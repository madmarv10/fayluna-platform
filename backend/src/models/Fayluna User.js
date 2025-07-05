// backend/src/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9._]+$/i
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatarUrl: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 255,
    default: ''
  },
  website: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Virtual for getting user's full profile URL
userSchema.virtual('profileUrl').get(function() {
  return `/profile/${this.username}`;
});

// Method to get public profile (without sensitive data)
userSchema.methods.toPublicJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.email;
  return user;
};

// Static method to find user by email or username
userSchema.statics.findByEmailOrUsername = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier },
      { username: identifier }
    ]
  });
};

const User = mongoose.model('User', userSchema);

export default User;
