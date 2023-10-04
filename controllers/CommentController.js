const CommentModel = require('../models/Comment');

module.exports = {
  createComment: (req, res) => {
    const payload = req.body;
    CommentModel.createComment(payload)
      .then((comment) => {
        res.status(200).json({
          status: true,
          data: comment,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  updateComment: (req, res) => {
    const post_id = req.params.id;
    const payload = req.body;
    CommentModel.updateComment(post_id, payload)
      .then((comment) => {
        res.status(200).json({
          status: true,
          data: comment,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  getCommentByPost: (req, res) => {
    const post_id = req.params.id;
    CommentModel.findCommentByPostId(post_id)
      .then((comment) => {
        if (!comment) {
          res.status(400).json({
            status: false,
            message: `Comment with post_id ${post_id} not found`,
          });
        } else {
          res.status(200).json({
            status: true,
            data: comment,
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

  deleteComment: (req, res) => {
    const post_id = req.params.id;
    CommentModel.deleteComment(post_id)
      .then((comment) => {
        res.status(200).json({
          status: true,
          data: comment,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },
};
