'use strict';

coiniverse.controller('homeController',
  ['$scope', '$http', 'socket', '$routeParams', '$location',
	function ($scope, $http, socket, $routeParams, $location)
{


  // Receiving data from server and pushing to front-end.
  socket.of('/' + $routeParams.psetid, 'predictions', 300000, function (data) {
    $scope.predictions = data;
  });
}]);

// Controller used to POST and save bus stop data to the API.
coiniverse.controller('setupController',
  ['$scope', '$http', '$location',
  function ($scope, $http, $location)
{

}]);