const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = {
  validate: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({
        status: false,
        message: 'Token not found',
      });
    } else {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: false,
            message: err.message,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  },
};
