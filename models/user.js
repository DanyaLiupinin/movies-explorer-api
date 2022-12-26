const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password') // ищем пользователя с почтой из запроса
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль'); // если такого нет - выдаём ошибку
      }
      return bcrypt.compare(password, user.password) // сравниваем пароль из запроса и из базы
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user; // возвращаем данные пользователя
        });
    });
};

module.exports = mongoose.model('user', userSchema);
