const { DataTypes } = require('sequelize');
const { roles } = require('../config');

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: roles.USER,
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('User', UserModel);
  },

  createUser: async (user) => {
    return await this.model.create(user);
  },

  findUser: async (id) => {
    return await this.model.findByPk(id);
  },

  findUserByEmail: async (email) => {
    return await this.model.findOne({ where: { email } });
  },

  findAllUsers: async () => {
    return await this.model.findAll();
  },

  deleteUser: async (id) => {
    return await this.model.destroy({ where: { id } });
  },
};
