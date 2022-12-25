const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const status = require('../utils/status');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movies.find({ owner })
    .then((movies) => {
      res.status(status.OK).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(status.CREATED).send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с таким id не существует');
    })
    .then((movie) => {
      const movieOwnerId = movie.owner.toString();
      if (req.user._id === movieOwnerId) {
        Movies.deleteOne(movie)
          .then(() => {
            res.status(status.OK).send(movie);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалить фильм');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
