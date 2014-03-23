'use strict';

coiniverse.controller('skyController',
  ['$scope', '$http',
  function ($scope, $http)
{
  // Get current time.
  // Then update the css background-position to that location.
  var sky = $scope.sky = {
    position: 0, // 0 to 100.
    calculatePosition: function calculatePosition () {
      var date = new Date();
      var hour = date.getHours();
      var month = date.getMonth();

      // Sets an integer from 0 to 100.
      this.position = 100;
    },
    weather: {
      type: '', // clear, cloudy, rainy, snowy, t-storms
      severity: 0 // 0 to 10; 10 being most severe.
    },
    calculateWeather: function calculateWeather () {
      // Set the weather object.
      this.weather;
    }
  };

  sky.calculatePosition();

  // In the future, incorporate location and weather.
}]);

coiniverse.controller('homeController',
  ['$scope', '$http', '$routeParams', '$location', '$interval',
  '$q', '$window',
	function ($scope, $http, $routeParams, $location, $interval, $q, $window)
{
  // Get balance.
  $http.get('/coinbase/current_balance')
  .success( function (data) {
    console.log(data);
  })
  .error( function (data) {
    console.log('Error');
  });

  // Static variables.
  var WIDTH = $window.innerWidth;
  var HEIGHT = $window.innerHeight;
  var FLOOR_Y = Math.floor(HEIGHT/4*3);

  // Add canvas.
  $('#home').append('<canvas id="canvas" width="' + WIDTH +
    '" height="' + HEIGHT + '"></canvas>');

  var canvas = $('#canvas')[0];
  var context = canvas.getContext('2d');

  // Classes for items.
  function Item (obj, callback) {
    // name, src, width, height, totalFrames,
    this.name = obj.name || '';
    this.x = 0;
    this.y = FLOOR_Y - obj.height;
    this.width = obj.width || 100;
    this.height = obj.height || 100;
    this.spriteSheet = new Image();                // This is the image element.
    this.spriteSheet.src = obj.src || '';
    this.spriteSheet.onload = function () {
      callback(null, true);
    };
    this.frame = 0;
    this.totalFrames = obj.totalFrames || 1;
    this.update = function update () {
      // Move position?
      // Maybe change position?
      // Draw itself?
      this.move();
      this.changeFrame();
      context.drawImage(this.spriteSheet, this.frame * this.width, 0,
        this.width, this.height, this.x, this.y, this.width, this.height);
    };
    this.changeFrame = function changeFrame () {
      // Animation sprites.
      if (Math.random() < 0.08)
        this.frame = 1;
      else
        this.frame = 0;
    };
    this.move = function move () {
      var rand = Math.random();
      if (rand > 0.95 && this.x < WIDTH)
        this.x = this.x + 20;
      else if (rand < 0.05 && this.x > 0)
        this.x = this.x - 20;
    };
  }

  // Show person sprite.

  var sprites = [
    {
      name: 'person',
      width: 85,
      height: 136,
      src: '/public/img/man-1.png',
      totalFrames: 2
    }
  ];

  var items = {
    arr: [],
    addNew: function addNew (item) {
      this.arr.push(item);
    },
    update: function update () {
      this.arr.forEach(function(i) {
        i.update();
      });
    }
  };

  function loadAll(arr) {
    var deferred = $q.defer();

    for (var i = 0; i < arr.length; i++) {
      items.addNew(new Item(arr[i], function(err, data) {
        if (err)
          deferred.reject('Some items did not load properly.');
        // else
        //   deferred.resolve('Loaded an item.');

        if (i == arr.length)
          deferred.resolve('Loaded all items.');
      }));
    }

    return deferred.promise;
  }

  var promise = loadAll(sprites);
  promise.then(function () {
    console.log('success');
    $interval(game, 100);
  }, function (reason) {
    console.log('reason: ' + reason);
  }, function (update) {
    console.log('update: ' + update);
  });

  // Loop.
  function game () {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    items.update();
  }
}]);

// Controller used to POST and save bus stop data to the API.
coiniverse.controller('setupController',
  ['$scope', '$http', '$location',
  function ($scope, $http, $location)
{

}]);