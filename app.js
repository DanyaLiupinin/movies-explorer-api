const express = require('express');
// const mongoose = require('mongoose');

const app = express();
app.listen(3000);
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

// app.use(requestLogger);

app.use('/users', userRouter); // перенести в routes/index.js и подключить сюда
app.use('/movies', movieRouter);

app.use(errorHandler());

/*
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
*/
