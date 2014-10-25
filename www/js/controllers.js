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
    "Vyvance",
    "Effexor",
    "Lexipro",
    "Lithium",
    "Adderall"
  ];

  $scope.viewPill = function(pillName){
    window.location.replace("#/app/pill/"+pillName);
  };
})

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
  


})

.controller('ReviewCtrl', function($scope, $location) {
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
        title: 'Enter Blank',
        subTitle: 'Please enter a number',
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
      'Enter Glucose',
      'Please enter your current glucose',
      'glucose'
    );
  };

});