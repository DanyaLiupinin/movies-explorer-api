const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');

// validation

const { createUserValidation, loginValidation } = require('./middlewares/validation');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/movies-explorer');
app.listen(3000);
app.use(bodyParser.json());

app.post('/signup', createUserValidation, createUser);

app.post('/signin', loginValidation, login);

app.use('/users', userRouter); // перенести в routes/index.js и подключить сюда
app.use('/movies', movieRouter);

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
