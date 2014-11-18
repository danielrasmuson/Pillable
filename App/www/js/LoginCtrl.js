angular.module('starter.controllers')
// todo put this location stuff in service
.controller('LoginCtrl', function($scope, UserService) {
  $scope.session = UserService.session;
});