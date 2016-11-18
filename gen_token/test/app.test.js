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

  describe('when requested at /token with client_id and client_secret', function() {
    it('should return a token', function(done) {
      request.post(baseUrl + '/token').query({client_id:'client1'}).query({client_secret: 'secret'}).end(function assert(err, res) {
        expect(err).to.not.be.ok;
        expect(res).to.have.property('status', 200);
        expect(res.text).to.be.a('string');
        done();
      });
    });
  });

  describe('when requested at /token without client_id and client_secret', function() {
    it('should return 400', function(done) {
      request.post(baseUrl + '/token').end(function assert(err, res) {
         expect(res).to.have.property('status', 400);
         expect(res.text).to.equal('include both client_id and client_secret in query string');
        done();
      });
    });
  });
});
