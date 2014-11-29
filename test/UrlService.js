var assert = require("assert"); // node.js core module
var getUrls = require("../scripts/UrlService.js").getUrls;

describe('UrlService', function(){
    it('should return the server url', function(){
        assert.equal('http://localhost:3000', getUrls().server); // 4 is not present in this array so indexOf returns -1
    })
    it('should return the app url', function(){
        assert.equal('http://localhost:8100', getUrls().app); // 4 is not present in this array so indexOf returns -1
    })
})