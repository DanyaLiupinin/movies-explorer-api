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

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
