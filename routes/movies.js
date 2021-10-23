const router = require('express').Router();
const { getMovies } = require('../controllers/movies');
const { createMovie } = require('../controllers/movies');
const { deleteMovieById } = require('../controllers/movies');
const { validateMovie, validateId } = require('../middlewares/Validation');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:id', validateId, deleteMovieById);

module.exports = router;
