var app = require('../app');
var expect  = require('chai').expect;
var request = require('request');



it('Main page content', function(done) {
    request('http://localhost:8081' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});

