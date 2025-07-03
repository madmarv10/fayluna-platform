// backend/src/models/Blog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // adjust path to your Sequelize instance

/**
 * Blog Model
 *
 * Fields:
 *  - id: auto-incrementing primary key
 *  - title: title of the submitted blog link
 *  - url: external blog URL (redirect target)
 *  - photoUrl: optional thumbnail/image URL
 *  - description: short description or summary
 *  - authorId: foreign key referencing User.id (the submitter)
 *  - createdAt / updatedAt: timestamps managed by Sequelize
 */

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [5, 100],
        msg: 'Title must be between 5 and 100 characters',
      },
    },
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'URL must be a valid link',
      },
      notEmpty: {
        msg: 'URL cannot be empty',
      },
    },
  },

  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Photo URL must be a valid link',
      },
    },
  },

  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      len: {
        args: [0, 500],
        msg: 'Description cannot exceed 500 characters',
      },
    },
  },

  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'blogs',
  timestamps: true,
  underscored: true,
});

// Associations (to be called after all models are defined)
Blog.associate = (models) => {
  // A Blog belongs to one User (author)
  Blog.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });

  // A Blog can have many Comments
  Blog.hasMany(models.Comment, { foreignKey: 'blog_id', as: 'comments' });

  // A Blog can have many Likes
  Blog.hasMany(models.Like, { foreignKey: 'blog_id', as: 'likes' });

  // A Blog can be bookmarked by many Users
  Blog.hasMany(models.Bookmark, { foreignKey: 'blog_id', as: 'bookmarks' });

  // A Blog can have Analytics entries
  Blog.hasMany(models.Analytics, { foreignKey: 'blog_id', as: 'analytics' });
};

module.exports = Blog;
