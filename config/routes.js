'use strict';

(function() {

var coinbase = require('../app/controller/coinbase');
/**
 * Import model ================================================================
 */

/**
 * Import helpers ==============================================================
 */

// Initialize hashing variables.

// Public functions. ===========================================================
module.exports = function (app, io) {
  // API routes ================================================================
  app.get('/coinbase/authorize', function (req, res) {
    res.redirect(coinbase.getCoinbaseAuthUrl());
  });

  app.get('/coinbase/refresh', function (req, res) {
    coinbase.refreshTokens(function() {
      console.log("derp");
    });
  });

  app.get('/coinbase/callback', function (req, res) {
    coinbase.getAccessToken(req.query.code, function() {
      res.redirect('/coinbase/balance');
    });
  })

  app.get('/coinbase/balance', function (req, res) {
    coinbase.getAccountBalance(function(balance) {
      res.send(balance);
    });
  })

	// Application route =========================================================
	app.get('/', function (req, res) {
    res.sendfile('index.html', {'root': './public/views/'});
  });


};

}());