angular.module('starter.controllers')
.controller('ReviewCtrl', function($scope, $location, PillDataService) {

    $scope.questions = {
        weightChange: 50
    };

    $scope.pillName = $location.path().split('/').pop().toLowerCase().replace(' ','_');

    PillDataService.getPill($scope.pillName).then(function(pill){
        $scope.pill = pill;
    });

    // $scope.pill = {
    //     description: "commonly used for anxiety"
    // };

    $scope.review = {
        comment: "",
        difficulty: 50,
        moodChange: 50,
        weightChange: 50,
        satisfaction: 50,
        profile: {
            image: "img/danielRasmuson.jpg",
            name: "Daniel Rasmuson"
        },
    };

    $scope.addReview = function(){
        PillDataService.addReview($scope.pillName, $scope.review);
        window.history.back();
    };
});