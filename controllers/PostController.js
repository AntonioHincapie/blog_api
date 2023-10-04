const PostModel = require('../models/Post');

module.exports = {
  createPost: (req, res) => {
    const payload = req.body;
    PostModel.createPost(payload)
      .then((post) => {
        res.status(200).json({
          status: true,
          data: post,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  updatePost: (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    PostModel.updatePost(id, payload)
      .then((post) => {
        res.status(200).json({
          status: true,
          data: post,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  getPost: (req, res) => {
    const id = req.params.id;
    PostModel.findPost(id)
      .then((post) => {
        if (!post) {
          res.status(400).json({
            status: false,
            message: `Post with id ${id} not found`,
          });
        } else {
          res.status(200).json({
            status: true,
            data: post,
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

  getUserPosts: (req, res) => {
    const user_id = req.params.id;
    PostModel.findPostByUserId(user_id)
      .then((post) => {
        if (!post) {
          res.status(400).json({
            status: false,
            message: `Post with user_id ${user_id} not found`,
          });
        } else {
          res.status(200).json({
            status: true,
            data: post,
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

  getAllPost: (req, res) => {
    PostModel.findAllPosts()
      .then((posts) => {
        res.status(200).json({
          status: true,
          data: posts,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  },

  deletePost: (req, res) => {
    const id = req.params.id;
    PostModel.deletePost(id)
      .then((post) => {
        res.status(200).json({
          status: true,
          data: post,
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
