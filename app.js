var express = require('express');
var app = express();

//token endpoint
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

//secured get endpoint
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt =  require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'THISSECRET';
opts.issuer = "accounts.examplesoft.com";
opts.audience = "yoursite.net";

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log("...............authorizing ");
  console.log(jwt_payload);
      if (jwt_payload.client_id === 'client001') {
        console.log(jwt_payload.client_id + ' has accessed the protected resource at ' + new Date());
          return done(null, jwt_payload.client_id);
      } else {
        return done(null, false);
      }
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         done(null, user);
    //     } else {
    //         done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

app.get('/', passport.authenticate('jwt', { session: false}),function(req,res) {
  res.send('You have accessed the protected resource.')
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
