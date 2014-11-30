var should = require('chai').should;
var syncHealthDataWithWalgreens = require("../scripts/walgreensBalanceRewards").syncHealthDataWithWalgreens;

describe('Walgreen Integration', function(){
    var requestResult;

    before(function(done){
        syncHealthDataWithWalgreens(14, 100, 100, 100)
        .then(function(walgreensResult){
            requestResult = walgreensResult;
            done();
        });
    });

    it('request should should be successful', function(){
        should(requestResult).should.equal(true);
    })
})