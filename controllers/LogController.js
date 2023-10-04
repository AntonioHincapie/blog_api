const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserModel = require('../models/User');

const { roles, jwtSecret, jwtExpirationInSeconds } = require('../config');

const generateToken = (username, userId) => {
  return jwt.sign({ username, userId }, jwtSecret, {
    expiresIn: jwtExpirationInSeconds,
  });
};

const ecryptPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

module.exports = {
  register: (req, res) => {
    const payload = req.body;
    const encryptedPassword = ecryptPassword(payload.password);
    const role = payload.role || roles.USER;
    UserModel.createUser(
      Object.assign(payload, { password: encryptedPassword, role })
    )
      .then((user) => {
        const token = generateToken(payload.username, user.id);
        res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: token,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    UserModel.findUserByEmail(email)
      .then((user) => {
        if (!user) {
          res.status(400).json({
            status: false,
            message: `User with email ${email} not found`,
          });
        } else {
          const encryptedPassword = ecryptPassword(password);
          if (user.password === encryptedPassword) {
            const token = generateToken(user.username, user.id);
            res.status(200).json({
              status: true,
              data: {
                user: user.toJSON(),
                token: token,
              },
            });
          } else {
            res.status(400).json({
              status: false,
              message: `User with email ${email} not found`,
            });
          }
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
