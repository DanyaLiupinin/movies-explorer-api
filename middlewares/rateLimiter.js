const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 600000,
  max: 200,
});

module.exports = limiter;
