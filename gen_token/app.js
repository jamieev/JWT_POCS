var express = require('express');
var app = express();

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds
//var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

// sign with RSA SHA256
//var cert = fs.readFileSync('private.key');  // get private key
//var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

// sign asynchronously
// jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
//   console.log(token);
// });

app.post('/token', function(req,res,err) {
  if(!req.query.client_id || !req.query.client_secret) {
    res.status(400).send('include both client_id and client_secret in query string');
  } else {
    res.send(jwt.sign({ iss: 'accounts.examplesoft.com', aud: 'yoursite.net', client_id: req.query.client_id }, req.query.client_secret));
  }
});


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
