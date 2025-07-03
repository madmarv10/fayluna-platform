// backend/src/models/Comment.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // adjust path to your Sequelize instance

/**
 * Comment Model
 *
 * Fields:
 *  - id: auto-incrementing primary key
 *  - content: text content of the comment
 *  - userId: foreign key referencing User.id
 *  - blogId: foreign key referencing Blog.id
 *  - createdAt / updatedAt: timestamps managed by Sequelize
 */

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Comment content cannot be empty',
      },
      len: {
        args: [1, 1000],
        msg: 'Comment must be between 1 and 1000 characters',
      },
    },
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
}, {
  tableName: 'comments',
  timestamps: true,
  underscored: true,
});

// Associations (to be called after all models are defined)
Comment.associate = (models) => {
  // A Comment belongs to one User (author)
  Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });

  // A Comment belongs to one Blog
  Comment.belongsTo(models.Blog, { foreignKey: 'blog_id', as: 'blog' });
};

module.exports = Comment;
