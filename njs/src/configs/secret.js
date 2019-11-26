var fs = require('fs');
var logger = require('../utils/logger');
const dotenv = require('dotenv');

module.exports = exports = {};

dotenv.config({
  path: '.env'
});

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
} else {
  logger.error('No .env file');
  process.exit(1);
}

var SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

exports.SESSION_SECRET = SESSION_SECRET;
