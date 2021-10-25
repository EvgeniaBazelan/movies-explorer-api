const { errorMessage } = require('../errors/ErrorMessages');

const limiterSettings = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000000,
  message: errorMessage.tooManyRequests,
};

module.exports = { limiterSettings };
