// backend/src/models/Tag.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

/**
 * Tag Model
 *
 * Represents a tag that can be associated with blog posts.
 * Tags help categorize and improve discoverability of blog posts.
 */

const Tag = sequelize.define(
  'Tag',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // No duplicate tag names
    },
  },
  {
    tableName: 'tags',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Tag;
