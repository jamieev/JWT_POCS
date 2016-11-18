var expect = require('chai').expect;
var request = require('superagent');

describe('protected get endpoint',function() {
  var myapp = require('../app');
  var port = '8080';
  var baseUrl = 'http://localhost:' + port;

  before(function(done) {
    myapp.start(port, done);
  });
  after(function(done) {
    myapp.stop(done);
  });

  describe('when requested without a valid auth token', function() {
    it('should return unauthorized', function(done) {
      request.get(baseUrl + '/').end(function assert(err, res) {
        expect(res).to.have.property('status', 401);
        done();
      });
    });
  });
});
