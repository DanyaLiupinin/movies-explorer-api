const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

movieRouter.get('/', auth, getMovies);
movieRouter.post('/', auth, createMovieValidation, createMovie);
movieRouter.delete('/:_id', auth, deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
