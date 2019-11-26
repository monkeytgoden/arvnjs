var route = require('express').Router();

route.use(require('./auth.route'));
route.use(require('./user.route'));
route.use(require('./upload-file.route'))

module.exports = route;