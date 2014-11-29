var assert = require("assert");
var getSession = require("../scripts/getSession").getSession;

var ACTIVE_USERID = 4;

describe('Get Session', function(){
    it('should get valid session', function(){
        console.log(JSON.stringify(getSession(ACTIVE_USERID)));
        assert.equal("number", typeof getSession(ACTIVE_USERID));
    });
})