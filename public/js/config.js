coiniverse.config( ['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
  when('/', {
    templateUrl: 'public/views/pages/setup.html',
    controller: 'setupController'
  }).
  when('/home/:id', {
    templateUrl: 'public/views/pages/home.html',
    controller: 'homeController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);