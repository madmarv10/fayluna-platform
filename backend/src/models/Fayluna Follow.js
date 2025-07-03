// backend/src/models/Follow.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // Adjust the path based on your structure

/**
 * Follow Model
 *
 * Represents the "following" relationship between users.
 * - followerId: the user who follows
 * - followingId: the user being followed
 * Ensures that a user can't follow the same user multiple times.
 */

const Follow = sequelize.define(
  'Follow',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'follows',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['follower_id', 'following_id'], // Prevent duplicate follows
      },
    ],
  }
);

// Optional associations (if needed later in app logic)
Follow.associate = (models) => {
  Follow.belongsTo(models.User, {
    foreignKey: 'follower_id',
    as: 'follower',
  });
  Follow.belongsTo(models.User, {
    foreignKey: 'following_id',
    as: 'following',
  });
};

module.exports = Follow;
