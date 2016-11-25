var expect = require('chai').expect;
var request = require('superagent');

describe('Simple unsecured token endpoint', function() {
  var myapp = require('../app');
  var port = '8080';
  var baseUrl = 'http://localhost:' + port;

  before(function(done) {
    myapp.start(port, done);
  });
  after(function(done) {
    myapp.stop(done);
  });

  describe('when requested at /oauth/token with client_id and client_secret', function() {
    it('should return a token', function(done) {
      request.post(baseUrl + '/oauth/token').set('Content-Type', 'application/x-www-form-urlencoded')
            .send({grant_type:'client_credentials',client_id:'thom',client_secret: 'nightworld'})
            .end(function assert(err, res) {
        expect(err).to.not.be.ok;
        expect(res).to.have.property('status', 200);
        expect(res.text).to.be.a('string');
        expect(res.text).to.contain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0aGl');
        done();
      });
    });
  });

  describe('when requested at /oauth/token without client_id and client_secret', function() {
    it('should return 400', function(done) {
      request.post(baseUrl + '/oauth/token').set('Content-Type', 'application/x-www-form-urlencoded')
          .send({grant_type:'client_credentials'}).end(function assert(err, res) {
         expect(res).to.have.property('status', 400);
         expect(res.text).to.contain('Invalid or missing client_id parameter');
        done();
      });
    });
  });

  describe('when requested at / without a valid auth token', function() {
    it('should return unauthorized', function(done) {
      request.get(baseUrl + '/').end(function assert(err, res) {
        expect(res).to.have.property('status', 400);
        done();
      });
    });
  });
});
