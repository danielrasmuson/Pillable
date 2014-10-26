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

    // REVIEW OBJ
    // {
    //     "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
    //     "difficulty": 50,
    //     "moodChange": 69,
    //     "profile": {
    //         "image": "img/danielRasmuson.jpg",
    //         "name": "Daniel Rasmuson"
    //     },
    //     "satisfaction": 60,
    //     "weightChange": 40
    // },
    var addReview = function(pillName, reviewObj){
        pills[pillName].reviews.push(reviewObj);
    };

   return {
    getPill: getPill,
    addReview: addReview,
   };
});
