var assert = require("assert");
var getSession = require("../scripts/getSession").getSession;
var expect = require('chai').expect;

var ACTIVE_USERID = 4;

describe('getSession', function(){
    var session;
    before(function(done){
        getSession(ACTIVE_USERID).then(function(userSession){
            session = userSession;
            done();
        });
    });

    it('should get valid session', function(){
        expect(session).to.be.a('string') 
    });
})