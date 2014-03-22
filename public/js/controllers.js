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
  ['$scope', '$http', 'socket', '$routeParams', '$location', '$interval',
  '$q',
	function ($scope, $http, socket, $routeParams, $location, $interval, $q)
{

  // Add canvas.
  $('#home').append('<canvas id="canvas"></canvas>');
  $('#canvas').css('width', '100%');
  $('#canvas').css('height', '100%');

  var canvas = $('#canvas')[0];
  var context = canvas.getContext('2d');

  // Classes for items.
  function Item (obj, callback) {
    // name, src, width, height, totalFrames,
    this.name = obj.name || '';
    this.x = 0;
    this.y = 0;
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
      context.drawImage(this.spriteSheet, this.frame * this.width, 0,
        this.width, this.height, this.x, this.y, this.width, this.height);
    };
    this.changeFrame = function changeFrame () {
      // Animation sprites.
      this.frames = 1;
    };
  }

  // Show person sprite.

  var sprites = [
    {
      name: 'person',
      width: 100,
      height: 100,
      src: '/public/img/man-1.png',
      totalFrames: 1
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

  // var asyncFnArr = [];

  // sprites.forEach(function(i){
  //   asyncFnArr.push(function(callback){
  //     items.addNew(new Item(sprites[i], callback));
  //   });
  // });

  // console.log($q.defer());


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
    $interval(game(), 3000);
  }, function (reason) {
    console.log('reason: ' + reason);
  }, function (update) {
    console.log('update: ' + update);
  });


  // $async(asyncFnArr, function(err, results) {
  //   // make sure there are no falses in results[1]
  //   // proceed
  //   console.log(results);
  //   $interval(game, 3000);
  // });


  // Loop.
  function game () {
    items.update();
  }
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