angular.module('starter.controllers')
// todo put this location stuff in service
.controller('SignupCtrl', function($scope) {
    $scope.userData = {
        firstName: "", 
        lastName: "", 
        email: "", 
        password: ""
    }

});