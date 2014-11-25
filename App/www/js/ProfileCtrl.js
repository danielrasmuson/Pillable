angular.module('starter.controllers')
.controller('ProfileCtrl', function($scope, $location, $ionicPopup, $http, UserService, UrlService, $q) {
    $scope.profile = {
      name:  "Daniel Rasmuson",
      weight:  155,
      bloodPressure:  100,
      glucose:  120
    };
    $scope.pristine = true;



    // Triggered on a button click, or some other target
    // TODO add value validating on here
    $scope.getNewValue = function(title, subTitle, putInputIn) {
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

    function getWalgreensRedirectUrl(session){
      var deferred = $q.defer(); 

      $http.post(UrlService.baseURL+'/getCode', {session: session})
      .then(function(result) {
        // console.log(result.data);
        deferred.resolve(result.data);
      })

      return deferred.promise;
    }


    // this means we got taken from the callback
    if ($location.search().oauthSync === 'success'){
      sendWalgreensRequest();
    }

    // they clicked the button
    $scope.loading = false;
    $scope.successSync = false;
    $scope.walgreensText = "Sync With Walgreens";
    $scope.syncWalgreen = function(){
        $scope.loading = true;
        $scope.walgreensText = "Syncing";
        sendWalgreensRequest();
    };

    function sendWalgreensRequest(){
      var healthData = {
        weight: $scope.profile.weight,
        bloodPressure: $scope.profile.bloodPressure,
        glucose: $scope.profile.glucose,
        session: UserService.getSession().session
      }; 

      $http.post(UrlService.baseURL+'/add/health', healthData)
      .then(function (result) {
        if (result.data === 'walgreens token missing'){
          getWalgreensRedirectUrl(UserService.getSession().session)
          .then(function(oauthUrl){
            window.location.replace(oauthUrl);
          });
        } else if(result.data === 'true'){
          $scope.loading = false;
          $scope.successSync = true;
          $scope.walgreensText = "Sync Successful!";
        } else {
          console.log('Unknown Error: '+result.data);
        }
      });
    }

});