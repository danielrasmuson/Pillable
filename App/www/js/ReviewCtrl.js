angular.module('starter.controllers')
.controller('ReviewCtrl', function($scope, $location) {
    $scope.reviewNum = $location.path().split('/').pop();


});