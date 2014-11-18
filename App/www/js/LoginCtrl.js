angular.module('starter.controllers')
// todo put this location stuff in service
.controller('LoginCtrl', function($scope, UrlService, $http, UserService) {
  $scope.session = UserService.getSession();
  $scope.loginData = {
    username: "",
    password: ""
  }
  $scope.signup = function(){
    window.location.replace('#/app/signup'); 
  }
  $scope.login = function(username, password){
    // note make sure to include  in function
    var credentials = {"email":$scope.loginData.username, "password": $scope.loginData.password}; 
    $http.post(UrlService.baseURL+"/login", credentials)
    .then(function (result) {
        var session = result.data
        if (session !== 'false'){
          UserService.setSession(session);
          window.location.replace('#/app/search'); 
        } else {
          alert('login failed');
        }
    });
  }
});