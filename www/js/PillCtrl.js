angular.module('starter.controllers')
// todo put this location stuff in service
.controller('PillCtrl', function($scope, $location) {
  $scope.toTitleCase = function(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  $scope.pillName = $location.path().split('/').pop().toLowerCase();
  var pathToPayLayoutExample = 'database/PillData.json';
  $.getJSON(pathToPayLayoutExample,function(pills){
    $scope.pill = pills[$scope.pillName];
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
    }, 300);

  });

  $scope.browser = function(link){
    var ref = window.open(link, '_blank', 'location=yes');
  };

  
});