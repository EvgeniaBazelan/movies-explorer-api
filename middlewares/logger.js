/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
// middlewares/logger.js

// eslint-disable-next-line import/no-extraneous-dependencies
const winston = require('winston');
// eslint-disable-next-line import/no-extraneous-dependencies
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'request.log' }),
    ],
    format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: 'error.log' }),
    ],
    format: winston.format.json(),
});

module.exports = {
    requestLogger,
    errorLogger,
};
