const { DataTypes } = require('sequelize');

const CommentModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  post_id: {
    type: DataTypes.INTEGER,
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('Comment', CommentModel);
  },

  createComment: async (comment) => {
    return await this.model.create(comment);
  },

  updateComment: async (id, comment) => {
    return await this.model.update(comment, { where: { id } });
  },

  findComment: async (id) => {
    return await this.model.findByPk(id);
  },

  findCommentByUserId: async (user_id) => {
    return this.model.findAll({ where: { user_id } });
  },

  findCommentByPostId: async (post_id) => {
    return this.model.findAll({ where: { post_id } });
  },

  findAllComments: async () => {
    return await this.model.findAll();
  },

  deleteComment: async (id) => {
    return await this.model.destroy({ where: { id } });
  },
};
