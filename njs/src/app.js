const express = require('express');
const dotenv = require('dotenv');

dotenv.config({
  path: '.env'
});
const app = express();
app.set('port', process.env.PORT || 9999);

app.use('/src/assets', express.static('src/assets'));

module.exports = app;
