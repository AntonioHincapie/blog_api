const UserModel = require('../models/User');

module.exports = {
  getUsers: (req, res) => {
    UserModel.findAllUsers()
      .then((users) => {
        res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  getUser: (req, res) => {
    const id = req.params.id;
    UserModel.findUser(id)
      .then((user) => {
        if (!user) {
          res.status(400).json({
            status: false,
            message: `User with id ${id} not found`,
          });
        } else {
          res.status(200).json({
            status: true,
            data: user,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    UserModel.deleteUser(id)
      .then((user) => {
        if (!user) {
          res.status(400).json({
            status: false,
            message: `User with id ${id} not found`,
          });
        } else {
          res.status(200).json({
            status: true,
            data: user,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },
};
