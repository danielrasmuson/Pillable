angular.module('starter.controllers')
.controller('StoryCtrl', function($scope, $location, $http, UrlService) {
    $scope.reviewNum = $location.path().split('/').pop();

    $http.get(UrlService.baseURL+'/story/'+$scope.reviewNum).then(function (response) {
        console.log(response.data);
    }); 
});
