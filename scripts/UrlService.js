// unit test
// console.log(getUrls().server);
// console.log(getUrls().app);

var getUrls = function(){
    return {
        server: 'https://aqueous-temple-8608.herokuapp.com',
        // server: 'http://localhost:3000',
        app: 'http://localhost:8100'
    }
}

exports.getUrls = getUrls;