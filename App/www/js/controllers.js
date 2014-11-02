angular.module('starter.controllers', [])
.controller('SearchCtrl', function($scope, $ionicModal) {
  $scope.popular = [
    "Vyvanse",
    "Effexor",
    "Lexapro",
    "Lithium Carbonate",
    "Adderall"
  ];

  $scope.viewPill = function(pillName){
    window.location.replace("#/app/pill/"+pillName);
  };

  $scope.viewSearch = function(){
    window.location.replace("#/app/searchScreen");
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/searchScreen.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
});