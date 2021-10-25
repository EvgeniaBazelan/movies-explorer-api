const { celebrate, Joi } = require('celebrate');
// const errorMessages = require('../errors/ErrorMessages');

const {
  wrongName, wrongAuth, wrongId, wrongMail, wrongPassword, wrongLink,
} = require('../errors/ErrorMessages');

// eslint-disable-next-line max-len
const link = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

const validateUser = celebrate({
  body: Joi.object().keys({
    email:
      Joi.string()
        .required()
        .min(2)
        .max(30)
        .email({ tlds: { allow: false } }),
    name:
      Joi.string()
        .required()
        .min(2)
        .max(30),
  }).unknown(true),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
      .alphanum()
      .error(new Joi.ValidationError(wrongId)),
  }).unknown(true),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
    trailer: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
    movieId: Joi.number().unsafe().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
  }).unknown(true),
});

const validateSigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongAuth)),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError(wrongAuth)),
  }).unknown(true),
});

const validateSigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .error(new Joi.ValidationError(wrongName)),
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongMail)),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError(wrongPassword)),
  }).unknown(true),
});

module.exports = {
  validateUser,
  validateMovie,
  validateSigIn,
  validateSigUp,
  validateId,
};
