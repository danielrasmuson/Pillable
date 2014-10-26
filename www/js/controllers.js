angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SearchCtrl', function($scope) {
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
})

.controller('ReviewCtrl', function($scope, $location) {
  $scope.questions = {
    weightChange: 50
  };

  $scope.pill = {
    name: $location.path().split('/').pop(),
    description: "commonly used for anxiety"
  };
})

.controller('ProfileCtrl', function($scope, $location,  $ionicPopup) {
  $scope.profile = {
    name:  "Daniel Rasmuson",
    weight:  155,
    bloodPressure:  100,
    glucose:  120
  };
  $scope.pristine = true;

  // Triggered on a button click, or some other target
  $scope.getNewValue = function(title, subTitle, putInputIn) {
    console.log('clicked');
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
        template: '<input type="tel" ng-model="data.wifi">',
        title: title,
        subTitle: subTitle,
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          },
        ]
      });
      myPopup.then(function(res) {
        $scope.profile[putInputIn] = parseFloat(res);
        $scope.pristine = false;
      });
    };

  $scope.getWeight = function(){
    $scope.getNewValue(
      'Enter Weight',
      'Please enter your current weight',
      'weight'
    );
  };

  $scope.getBloodPressure = function(){
    $scope.getNewValue(
      'Enter Blood Pressure',
      'Please enter your current blood pressure',
      'bloodPressure'
    );
  };

  $scope.getGlucose = function(){
    $scope.getNewValue(
      'Enter Blood Glucose',
      'Please enter your current blood glucose',
      'glucose'
    );
  };

});