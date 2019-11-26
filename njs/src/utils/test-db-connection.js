/* eslint-disable no-console */
var dotenv = require('dotenv');

dotenv.config({ path: '.env' });
var sequelize = require('../configs/sequelize');

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.error('Unable to connect to the database:', err);
  });
