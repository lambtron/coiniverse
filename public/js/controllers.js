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
  $scope.connectCoinbase = function connectCoinbase () {
    // Redirect user to this page
    // https://coinbase.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL

    //
  };
}]);