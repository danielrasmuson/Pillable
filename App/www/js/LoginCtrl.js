angular.module('starter.controllers')
// todo put this location stuff in service
.controller('LoginCtrl', function($scope, UserService) {
  $scope.session = UserService.session;
  $scope.signup = function(){
    console.log('hello');
    window.location.replace('#/app/signup'); 
  }
});