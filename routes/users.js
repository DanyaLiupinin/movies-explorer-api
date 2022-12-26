const userRouter = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  updateUserValidation,
  getUserValidation,
} = require('../middlewares/validation');

userRouter.get('/me', getUserValidation, getUser);
userRouter.patch('/me', updateUserValidation, updateUser);

module.exports = userRouter;
