const router = require('express').Router();
const {
  SchemaRegistrationMiddleware,
  IsAuthenticatedMiddleware,
} = require('./middlewares/');
const registerSchema = require('./models/schemas/registerSchema');
const loginSchema = require('./models/schemas/loginSchema');
const { register, login } = require('./controllers/LogController');
const {
  getUsers,
  getUser,
  deleteUser,
} = require('./controllers/UserController');
const {
  createPost,
  updatePost,
  getPost,
  getUserPosts,
  getAllPost,
  deletePost,
} = require('./controllers/PostController');
const {
  getCommentByPost,
  updateComment,
  createComment,
  deleteComment,
} = require('./controllers/CommentController');

// LogIn and Register Routes
router.post(
  '/register',
  [SchemaRegistrationMiddleware.validate(registerSchema)],
  register
);
router.post(
  '/login',
  [SchemaRegistrationMiddleware.validate(loginSchema)],
  login
);

// Users Routes
router.get('/users', [IsAuthenticatedMiddleware.validate], getUsers);
router.get('/user/:id', [IsAuthenticatedMiddleware.validate], getUser);
router.get('/user/:id', [IsAuthenticatedMiddleware.validate], deleteUser);

// Post Routes
router.post('/post', [IsAuthenticatedMiddleware.validate], createPost);
router.put('/post/:id', [IsAuthenticatedMiddleware.validate], updatePost);
router.get('/post/:id', [IsAuthenticatedMiddleware.validate], getPost);
router.get('/posts/:id', [IsAuthenticatedMiddleware.validate], getUserPosts);
router.get('/posts', [IsAuthenticatedMiddleware.validate], getAllPost);
router.delete('/post/:id', [IsAuthenticatedMiddleware.validate], deletePost);

// Comment Routes
router.post('/comment', [IsAuthenticatedMiddleware.validate], createComment);
router.put('/comment/:id', [IsAuthenticatedMiddleware.validate], updateComment);
router.get(
  '/comments/:id',
  [IsAuthenticatedMiddleware.validate],
  getCommentByPost
);
router.delete(
  '/comment/:id',
  [IsAuthenticatedMiddleware.validate],
  deleteComment
);

module.exports = router;
