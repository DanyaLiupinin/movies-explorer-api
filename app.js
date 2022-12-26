const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { router } = require('./routes/index');
const rateLimit = require('./middlewares/rateLimiter');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.listen(3000);
app.use(bodyParser.json());
app.use(rateLimit);
app.use(helmet());
app.use(router);
app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// cors
// проверить роуты
// файл env на сервер
// написть readme
