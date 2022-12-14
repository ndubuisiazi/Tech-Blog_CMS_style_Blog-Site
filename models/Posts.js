const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_title: {
      type: DataTypes.STRING,
      allowNull: false,
      timestamps: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Posts',
  }
);

module.exports = Posts;
