var express = require('express');
var app = express();
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

app.listen('3000');
console.log('Listening on port 3000');
