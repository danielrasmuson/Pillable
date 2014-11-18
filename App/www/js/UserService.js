angular.module('starter')
.service('UserService', function() {
  var data = {
    session: 'sdkljfaljsd23423'
  }

  return {
    session: data.session
  }
});

