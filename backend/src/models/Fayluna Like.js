// backend/src/models/Like.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // adjust path to your Sequelize instance

/**
 * Like Model
 *
 * Fields:
 *  - id: auto-incrementing primary key
 *  - userId: foreign key referencing User.id
 *  - blogId: foreign key referencing Blog.id
 *  - createdAt / updatedAt: timestamps managed by Sequelize
 *
 * A Like represents a user liking a specific blog post.
 */

const Like = sequelize.define(
  'Like',
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
        model: 'users', // table name
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs', // table name
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'likes',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'blog_id'], // a user can only like a blog once
      },
    ],
  }
);

// Associations (to be called after all models are defined)
Like.associate = (models) => {
  // A Like belongs to one User
  Like.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

  // A Like belongs to one Blog
  Like.belongsTo(models.Blog, { foreignKey: 'blog_id', as: 'blog' });
};

module.exports = Like;
