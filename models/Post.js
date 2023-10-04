const { DataTypes } = require('sequelize');

const PostModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('Post', PostModel);
  },

  createPost: async (post) => {
    return await this.model.create(post);
  },

  updatePost: async (id, post) => {
    return await this.model.update(post, { where: { id } });
  },

  findPost: async (id) => {
    return await this.model.findByPk(id);
  },

  findPostByUserId: async (user_id) => {
    return this.model.findAll({ where: { user_id } });
  },

  findAllPosts: async () => {
    return await this.model.findAll();
  },

  deletePost: async (id) => {
    return await this.model.destroy({ where: { id } });
  },
};
