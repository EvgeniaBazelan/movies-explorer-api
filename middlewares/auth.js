/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const Unauthorized = require('../errors/Unauthorized');

// middlewares/auth.js

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.trim().startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация1' });
  }

  const token = authorizationHeader.replace('Bearer ', '').trim();
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация2' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return next(new Unauthorized('Необходима авторизация'));
//   }
//   // eslint-disable-next-line no-return-assign,no-undef
//
//   return payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, decoded) => {
//     if (err) {
//       return next(new Unauthorized('Необходима авторизация'));
//     }
//     req.user = decoded;
//     return next();
//   });
// };
