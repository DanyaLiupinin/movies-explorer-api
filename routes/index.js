const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const { NotFoundError } = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use(auth, (req, res, next) => {
  const error = new NotFoundError('Страница не найдена');
  next(error);
});

exports.router = router;
