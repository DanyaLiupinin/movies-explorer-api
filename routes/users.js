const userRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  updateUserValidation,
  getUserValidation,
} = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

userRouter.get('/me', auth, getUserValidation, getUser);
userRouter.patch('/me', auth, updateUserValidation, updateUser);

module.exports = userRouter;
