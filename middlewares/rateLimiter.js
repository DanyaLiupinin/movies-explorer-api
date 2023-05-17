const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 600000,
  max: 500,
});

module.exports = limiter;
