/* eslint-disable linebreak-style */
const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN, thumbnail,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, owner: ownerId, movieId, nameRU, nameEN, thumbnail,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Вы не заполнили обязательные поля или данные не верны'));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFound('Карточка с таким id не найдена!'))
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.id);
      }
      throw new Forbidden('Недостаточно прав для удаления карточки');
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
