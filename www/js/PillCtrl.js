angular.module('starter.controllers')
// todo put this location stuff in service
.controller('PillCtrl', function($scope, $location) {
  var nameOfMedication = $location.path().split('/').pop().toLowerCase();
  $scope.pill = "";
  var pathToPayLayoutExample = 'database/PillData.json';
  $.getJSON(pathToPayLayoutExample,function(result){
    $scope.pill = result[nameOfMedication];
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

  $scope.browser = function(link){
    var ref = window.open(link, '_blank', 'location=yes');
  };

  
});