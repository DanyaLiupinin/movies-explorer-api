const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/movies-explorer');
app.listen(3000);
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63a7282bafd386d05f0102e3',
  };

  next();
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', userRouter); // перенести в routes/index.js и подключить сюда
app.use('/movies', movieRouter);

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
