const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const status = require('../utils/status');

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Пользователь не найден'));
        return;
      }
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate({ _id: userId }, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((data) => {
      res.status(status.OK).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь не найден'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUser,
  updateUser,
};
