const options = {
  origin: [
    'http://localhost:3000',
    'https://praktikum.tk',
    'https://cinema-explorer.nomoredomains.club',
    'https://danyaliupinin.github.io',
    'https://www.dkovandeveloper.online',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;
