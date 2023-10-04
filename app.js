const express = require('express');
const app = express();
const cors = require('cors');
const { Sequelize } = require('sequelize');

const { port } = require('./config');
const PORT = process.env.PORT || port;

const Routes = require('./routes');

const UserModel = require('./models/User');
const PostModel = require('./models/Post');
const CommentModel = require('./models/Comment');

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/data.db',
});

UserModel.initialize(sequelize);
PostModel.initialize(sequelize);
CommentModel.initialize(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log('Database & tables created!');

    app.use('/', Routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
