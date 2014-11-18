angular.module('starter')
.service('UrlService', function() {
    var baseURL = "http://localhost:3000";
   return {
    baseURL: baseURL
   };
});

