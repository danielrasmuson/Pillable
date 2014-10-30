angular.module('starter')
// todo put this location stuff in service
.service('PillDataService', function($location, $q) {

    var pills = false;

    var getPill = function(pillName){
        var deferred = $q.defer(); 
        if (pills){
            deferred.resolve(pills[pillName]);
        } else{
            console.log('getting new database');
            $.getJSON('database/PillData.json',function(data){
                pills = data;
                deferred.resolve(pills[pillName]);
            }); 
        } 
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
