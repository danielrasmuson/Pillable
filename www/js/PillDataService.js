angular.module('starter')
// todo put this location stuff in service
.service('PillDataService', function($location, $q) {

    var pills = false;

    var getPill = function(pillName){
        var deferred = $q.defer(); 
        if (pills){
            deferred.resolve(pills[pillName]);
        } else{
            $.getJSON('database/PillData.json',function(data){
                pills = data;
                deferred.resolve(pills[pillName]);
            }); 
        } 
        return deferred.promise;
    };

   return {
    getPill: getPill
   };
});
