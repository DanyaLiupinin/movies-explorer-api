const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const rateLimit = require('./middlewares/rateLimiter');
const options = require('./utils/corsOptions');

const { MONGO_URL } = process.env;

app.use('*', cors(options));

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000);
app.use(bodyParser.json());
app.use(rateLimit);
app.use(helmet());
app.use(router);
app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// файл env на сервер
// написть readme
