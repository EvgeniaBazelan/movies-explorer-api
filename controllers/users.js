/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable function-paren-newline */
/* eslint-disable object-shorthand */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictingRequest = require('../errors/ConflictingRequest');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!email || !password) {
    return next(new BadRequest('Email или пароль не могут быть пустыми'));
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictingRequest('Пользователь уже существует'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, email, password: hash,
    }))
  // eslint-disable-next-line no-shadow
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка при создании пользователя'));
      } if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictingRequest('Пользователь с таким E-mail уже существует'));
      }
      return next(err);
    });
};
module.exports.updateUser = (req, res, next) => {
  const id = req.user._id;
  const {
    name,
    email,
  } = req.body;

  User.findByIdAndUpdate(id, {
    name,
    email,
  }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь с таким Id не существует'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequest('Данные пользователя не корректны'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id, email: user.email, password: user.password, name: user.name,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        // 'secretKey123',
        { expiresIn: 604800000 },
      );
      return res.send({ message: 'Авторизация прошла успешно', token: token });
      // res
      // .cookie('jwt', token, {
      //   maxAge: 604800000,
      //   domain: 'movies.backend.nomoredomains.rocks',
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: true,
      // })
      // .send({ message: 'Авторизация прошла успешно', token: token });
    })
    .catch((err) => next(new Unauthorized(`Пользователь не авторизован + ${err.message}`)));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь с таким Id не существует'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFound('Пользователь по указанному _id не найден!'));
      }
      return next(err);
    });
};
