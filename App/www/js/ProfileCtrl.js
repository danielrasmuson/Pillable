angular.module('starter.controllers')
.controller('ProfileCtrl', function($scope, $location,  $ionicPopup, $http) {
    $scope.profile = {
      name:  "Daniel Rasmuson",
      weight:  155,
      bloodPressure:  100,
      glucose:  120
    };
    $scope.pristine = true;

    // Triggered on a button click, or some other target
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

    $scope.loading = false;
    $scope.successSync = false;
    $scope.walgreensText = "Sync With Walgreens";
    $scope.syncWalgreen = function(){
        $scope.loading = true;
        $scope.walgreensText = "Syncing";

        // todo this pulls from database
        var token = "90c8b55aaafe542a9dd5331a1b9ce7f6a65b74f93a98261778188dd9519f8b18";
        // todo this is generated randomly
        var transaction_id = "904986923560504";


        runSync(token, transaction_id, $scope.profile.bloodPressure, $scope.profile.glucose, $scope.profile.weight);

        setTimeout(function() {
            $scope.loading = false;
            $scope.successSync = true;
            $scope.walgreensText = "Sync Successful!";
            $scope.$apply();
        }, 1500);
    };

    function runSync(token, transaction_id, bloodPressure, glucose, weight){

      var apiKey = "Eu9ZiReoEQbKZu6GQzrJTLW2LsQiKJHk";
      // var urlToPost = "https://services-qa.walgreens.com/api/steps/activity/v1?apiKey="+apiKey;

      var dataToPost =  {
        "creates": [
          {
            "access_token": token,
            "affiliate_id": "pllpdse",
            "date": "2014-05-05",
            "device_name": "Pillable",
            "manufacturer_name": "Pillable",
            "transaction_id": transaction_id,
            "user_device_id": "9167332",
            "data": [
              {
                "device_tracked": "true",
                "id": "a6e3502053df0131569d1231392",
                "timestamp": "2014-03-18 02:10:10",
                "type": "blood_pressure",
                "value": {
                  "diastolic": bloodPressure,
                  "systolic": bloodPressure 
                } 
              },
              {
                "device_tracked": "true",
                "id": "a6e3502053df0131569d1231392",
                "timestamp": "2014-03-18 02:10:10",
                "type": "blood_oxygen_ratio",
                "value": glucose 
              },
              {
                "device_tracked": "true",
                "id": "a6e3502053df0131569d1231392",
                "timestamp": "2014-03-18 02:10:10",
                "type": "weight",
                "value": weight 
              } 
            ]
          }
        ]
      };

      var urlToPost = "http://localhost:3000/updateWalgreensMetrics";
      console.log(urlToPost);
      console.log(dataToPost);
      // $http.post(urlToPost, dataToPost)
      // .then(function (result) {
      //    alert(result.data);
      // });
    };
});