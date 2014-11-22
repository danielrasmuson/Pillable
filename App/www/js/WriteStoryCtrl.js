// title, body, difficulty, weightChange, moodChange, satisfaction, userId, pillId
angular.module('starter.controllers')
.controller('WriteStoryCtrl', function($scope, $location, PillDataService) {
    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }


    $scope.questions = {
        weightChange: 50
    };

    $scope.pillName = toTitleCase($location.path().split('/').pop().replace('_', ' '));
    var cleanPillName = $scope.pillName.toLowerCase().replace(' ','_');

    PillDataService.getPill(cleanPillName).then(function(pill){
        $scope.pill = pill;
    });

    // TODO CHANGE TITLE AND USERID
    $scope.story = {
        userId: 10,
        title: 'TEST TITLE',
        comment: "",
        difficulty: 50,
        moodChange: 50,
        weightChange: 50,
        satisfaction: 50,
        pillId: pillId
    };

    $scope.addStory = function(){
        PillDataService.addstory($scope.story);
        window.history.back();
    };
});