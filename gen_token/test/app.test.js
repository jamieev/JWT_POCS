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

  describe.only('when requested at /token with client_id and client_secret', function() {
    it('should return a token', function(done) {
      request.get(baseUrl + '/token').end(function assert(err, res) {
        expect(err).to.not.be.ok;
        expect(res).to.have.property('status', 200);
        expect(res.text).to.equal('Hello World');
        done();
      });
    });
  });

  describe('when requested at /hello', function() {
    it('should say hello', function(done) {
      request.get(baseUrl + '/hello?client_id=client001&client_secret=secret').end(function assert(err, res) {
        expect(err).to.not.be.ok;
        expect(res).to.have.property('status', 200);
        expect(res.text).to.equal('Hello World');
        done();
      });
    });
  });
});
