angular.module('starter.controllers')
// todo put this location stuff in service
.controller('PillCtrl', function($scope, $location) {
  $scope.pill = {
    name: $location.path().split('/').pop(),
    description: "commonly used for anxiety",
    information: "http://pillbox.nlm.nih.gov/pillimage/search.php",
    image: 'http://placehold.it/100x100',
    refill: "http://www.walgreens.com/",
  };
  $scope.pill.reviews = [];
  $scope.pill.reviews[0] = {
    difficulty: 5,
    weightGain: 40,
    timeOn: 70,
    moodChange: 69,
    satisfaction: 60,
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
    profile: {
      name: "Daniel Rasmuson",
      image: "http://placehold.it/100x100"
    }
  };
  $scope.pill.reviews[1] = {
    difficulty: 4,
    weightGain: 10,
    timeOn: 30,
    moodChange: 29,
    satisfaction: 30,
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
    profile: {
      name: "Pete Kane",
      image: "http://placehold.it/100x100"
    }
  };
  $scope.pill.reviews[2] = {
    difficulty: 8,
    weightGain: -10,
    timeOn: 120,
    moodChange: 119,
    satisfaction: 100,
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
    profile: {
      name: "Bill Clinton",
      image: "http://placehold.it/100x100"
    }
  };

  $scope.browser = function(link){
    var ref = window.open(link, '_blank', 'location=yes');
  };

  $scope.getAverage = function(key){
    total = 0;
    count = 0;
    for (var i = 0; i < $scope.pill.reviews.length; i++) {
      total += $scope.pill.reviews[i][key];
      count += 1;
    }
    return Math.round(total/count);
  };

  // todo put this in servce
  $scope.writeReview = function(pillName){
    window.location.replace("#/app/review/"+pillName);

  };

  setTimeout(function() {
    $(document).ready(function() {
        $('.progress .progress-bar').progressbar();
    }); 
  }, 20);

});