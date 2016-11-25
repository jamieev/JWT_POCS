var express = require('express');
var app = express(),
bodyParser = require('body-parser'),
oauthserver = require('node-oauth2-server');
var memorystore = require('./model.js');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.oauth = oauthserver({
  model: memorystore,
  grants: ['client_credentials'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(),function(req,res) {
  res.send('You have accessed the protected resource.')
});

app.use(app.oauth.errorHandler());
app.listen(3001);
console.log('listening on port 3001');

//start/stop server
var server;
var start = exports.start = function start(port, callback) {
  server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
  server.close(callback)
};
