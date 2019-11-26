var app = require('./app');
var errorHandler = require('errorhandler');

/**
 * Error Handler. Provides full stack - remove for production
 */
var NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== 'production') {
  app.use(errorHandler());
}

var server = app.listen(app.get('port'), function () {
  console.log(
    '  RESTful API server started on http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = server;
