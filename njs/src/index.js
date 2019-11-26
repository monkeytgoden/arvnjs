var app = require('./app');

var server = app.listen(app.get('port'), function () {
  console.log(
    '  RESTful API server started on http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = server;
