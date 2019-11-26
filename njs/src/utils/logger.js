var winston = require('winston');
var utils = require('../utils');

var logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: utils.ENVIRONMENT === 'production' ? 'error' : 'debug' }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' })
  ],
  exitOnError: false,
});

if (utils.ENVIRONMENT !== 'production') {
  logger.debug('Logging initialized at debug level');
}

module.exports = logger;
