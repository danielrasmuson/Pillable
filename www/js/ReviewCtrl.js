angular.module('starter.controllers')
.controller('ReviewCtrl', function($scope, $location, PillDataService) {

    $scope.questions = {
        weightChange: 50
    };

    $scope.pillName = $location.path().split('/').pop().replace(' ','_');

    PillDataService.getPill($scope.pillName.toLowerCase()).then(function(pill){
        $scope.pill = pill;
    });

    // $scope.pill = {
    //     description: "commonly used for anxiety"
    // };

    $scope.comments = "";
    $scope.difficulty = 50;
    $scope.moodChange = 50;
    $scope.weightChange = 50;
    $scope.satisfaction = 50;
    $scope.addReview = function(){
        var reviewObj = {
            "comment": $scope.comment,
            "difficulty": $scope.difficulty,
            "moodChange": $scope.moodChange,
            "profile": {
                "image": "img/danielRasmuson.jpg",
                "name": "Daniel Rasmuson"
            },
            "satisfaction": $scope.satisfaction,
            "weightChange": $scope.weightChange 
        };
        PillDataService.addReview($scope.pill, reviewObj);
        alert('hello');
        window.history.back();
    };
});