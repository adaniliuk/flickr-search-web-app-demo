'use strict';

// Dependencies
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    config = require('./config');

// Config properties
var port = process.env.PORT || config.appPort || 3001;

var appRoot = __dirname,
    staticRoot = appRoot + './../client';

// Init express app
var app = express();
app.set('port', port);

var silent = 'development' !== app.get('env');

// Log incoming requests
silent || app.use(logger('dev'));

// Application returns client app static
app.use(express.static(staticRoot));

// 404 handler
app.use(function(req, res, next) {
  res.status(404).sendFile(path.join(staticRoot, '404.html'));
});

// Error handlers

// Development error handler
// Will print stacktrace
if ('development' === app.get('env')) {
  app.use(function(err, req, res, next) {
    // Simple stacktrace is sent for a moment
    res.status(err.status || 500).send(err.stack);
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  // Simple Internal Server Error message is sent for a moment
  res.status(err.status || 500).send('Internal Server Error');
});

// Start server
var server = app.listen(app.get('port'), function() {
  console.log('Service started, listening on port %d', server.address().port);
});
