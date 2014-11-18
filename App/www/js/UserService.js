angular.module('starter')
.service('UserService', function() {

    var userData = {
        session: false 
    }

    var getSession = function(){
        return userData.session;
    }
    var setSession = function(session){
        userData.session = session;
    }

    return {
        getSession: getSession,
        setSession: setSession
    };
});

