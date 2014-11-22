angular.module('starter')
.service('PillDataService', function($location, $q, $http, UrlService) {

    var pills = false;

    var getPill = function(pillName){
        var deferred = $q.defer(); 
        // if (pills){

            // deferred.resolve(pills[pillName]);
        // } else{
        // $.getJSON('database/PillData.json',function(data){
        $http.get('http://localhost:3000/pill/'+pillName).then(function (pillResponse) {
            var pill = pillResponse.data;
            $http.get(UrlService.baseURL+'/pill/img/'+pillName).then(function (imgResponse) {
                var img = imgResponse.data;
                if (img === "false"){
                    pill.image = "img/noImg.jpg"
                } else{
                    pill.image = img;
                }
                deferred.resolve(pill);
            });
        });

        // } 
        return deferred.promise;
    };

    var addReview = function(pillName, reviewObj){
        pills[pillName].reviews.push(reviewObj);
    };

   return {
    getPill: getPill,
    addReview: addReview,
   };
});

