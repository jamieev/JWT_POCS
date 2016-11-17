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

app.get('/token', function(req,res) {
  if(!req.query.client_id || !req.query.client_secret) {
    res.send(400, 'include both client_id and client_secret in query string')
  }
  res.send(jwt.sign({ iss: 'accounts.examplesoft.com', aud: 'yoursite.net', client_id: req.query.client_id }, req.query.client_secret));
});
app.listen(3001);
console.log('listening on port 3001');
