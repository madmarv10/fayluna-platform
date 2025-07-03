// backend/src/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // adjust path to your Sequelize instance

/**
 * User Model
 * 
 * Fields:
 *  - id: auto-incrementing primary key
 *  - username: unique identifier for profiles and URLs
 *  - name: display name
 *  - email: unique login email
 *  - passwordHash: hashed password
 *  - avatarUrl: optional profile picture
 *  - bio: short user bio
 *  - website: optional personal website URL
 *  - createdAt / updatedAt: timestamps managed by Sequelize
 */

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Username must be between 3 and 30 characters',
      },
      is: {
        args: /^[a-zA-Z0-9._]+$/i,
        msg: 'Username can only contain letters, numbers, dots, and underscores',
      },
    },
  },

  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [1, 50],
        msg: 'Name must be between 1 and 50 characters',
      },
    },
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
      len: {
        args: [5, 100],
        msg: 'Email must be between 5 and 100 characters',
      },
    },
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Avatar URL must be a valid URL',
      },
    },
  },

  bio: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      len: {
        args: [0, 255],
        msg: 'Bio cannot exceed 255 characters',
      },
    },
  },

  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Website must be a valid URL',
      },
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

// Associations (call these after all models have been defined)
User.associate = (models) => {
  // A User can have many Blog posts
  User.hasMany(models.Blog, { foreignKey: 'author_id', as: 'blogs' });

  // A User can have many Bookmarks
  User.hasMany(models.Bookmark, { foreignKey: 'user_id', as: 'bookmarks' });

  // A User can have many Follows as the follower
  User.hasMany(models.Follow, { foreignKey: 'follower_id', as: 'following' });

  // A User can have many Follows as the one being followed
  User.hasMany(models.Follow, { foreignKey: 'following_id', as: 'followers' });

  // A User can have many Comments
  User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });

  // A User can have many Likes
  User.hasMany(models.Like, { foreignKey: 'user_id', as: 'likes' });

  // A User can have many Analytics entries
  User.hasMany(models.Analytics, { foreignKey: 'user_id', as: 'analytics' });
};

module.exports = User;
