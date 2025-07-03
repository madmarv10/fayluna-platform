// backend/src/models/Bookmark.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // adjust this to your actual Sequelize instance path

/**
 * Bookmark Model
 *
 * Fields:
 *  - id: Primary key
 *  - userId: ID of the user who bookmarked
 *  - blogId: ID of the blog being bookmarked
 *  - createdAt / updatedAt: automatic timestamps
 *
 * Each bookmark represents a saved blog post by a user.
 */

const Bookmark = sequelize.define(
  'Bookmark',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // refers to the users table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs', // refers to the blogs table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'bookmarks',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'blog_id'], // prevent duplicate bookmarks by the same user
      },
    ],
  }
);

// Associations
Bookmark.associate = (models) => {
  Bookmark.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  Bookmark.belongsTo(models.Blog, { foreignKey: 'blog_id', as: 'blog' });
};

module.exports = Bookmark;
