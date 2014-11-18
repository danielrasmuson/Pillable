angular.module('starter.controllers')
// todo put this location stuff in service
.controller('SignupCtrl', function($scope, $http, UrlService) {
    $scope.userData = {
        firstName: "", 
        lastName: "", 
        email: "", 
        password: ""
    }

    $scope.signup = function(){
        // note make sure to incude  in function
        $http.post(UrlService.baseURL+'/add/user', $scope.userData)
        .then(function (result) {
           alert(result.data) 
           if (result.data === 'success'){
                UserService.setSession('todo: make this a real session');
                window.location.replace('#/app/search'); 
           } else{
                alert('signup failed');
           }
        });
    }

});