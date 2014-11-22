angular.module('starter')
.service('PillDataService', function($location, $q, $http, UrlService) {


    var getPill = function(pillName){
        var deferred = $q.defer(); 

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

        return deferred.promise;
    };

    var addStory = function(storyObj){
        $http.post('http://127.0.0.1:3000/add/story', storyObj)
        .then(function (result) {
           // alert(result.data) 
           console.log(result.data);
        });
    };

   return {
    getPill: getPill,
    addStory: addStory
   };
});

