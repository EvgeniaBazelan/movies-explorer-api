/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFound = require('./errors/NotFound');
const { validateSigIn, validateSigUp } = require('./middlewares/Validation');
const { handleErrors } = require('./errors/HandleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATABASE_DEV, mongooseSettings } = require('./middlewares/constants');

const { DATABASE, NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(cookieParser());

app.get('/posts', (req, res) => {
  console.log(req.cookies.jwt); // достаём токен
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/moviesdb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });
// mongoose.connect(DATABASE_DEV, mongooseSettings);
mongoose.connect(NODE_ENV === 'production' ? DATABASE : DATABASE_DEV, mongooseSettings);

app.use(requestLogger);
// app.use(errors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSigUp, createUser);
app.post('/signin', validateSigIn, login);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use(auth, (req, res, next) => {
  next(new NotFound(`По адресу ${req.path} ничего нет`));
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (err) {
    return handleErrors(res, err);
  }
  return next();
});

app.listen(PORT);
