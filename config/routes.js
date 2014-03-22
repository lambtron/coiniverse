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
      res.redirect('/');
    });
  });

  app.get('/coinbase/callback', function (req, res) {
    coinbase.getAccessToken(req.query.code, function() {
      res.redirect('/');
    });
  });

  app.get('/coinbase/get_minimum_buy_bitcoin_amount', function (req, res) {
    coinbase.getMinimumBitcoinBuyAmount(function(result) {
      res.send({ amount: result });
    });
  });

  app.get('/coinbase/get_minimum_sell_bitcoin_amount', function (req, res) {
    coinbase.getMinimumBitcoinSellAmount(function(result) {
      res.send({ amount: result });
    });
  });

  app.get('/coinbase/get_current_bitcoin_price', function (req, res) {
    coinbase.getCurrentBitcoinPrice(function(result) {
      res.send({ price: result});
    });
  });

  app.post('/coinbase/buy_bitcoins', function (req, res) {
    coinbase.buyBitcoins(req.query.amount, function(result) {
      res.send(result);
    });
  });

  app.post('/coinbase/sell_bitcoins', function (req, res) {
    coinbase.sellBitcoins(req.query.amount, function(result) {
      res.send(result);
    });
  });

  app.get('/coinbase/current_balance', function (req, res) {
    coinbase.getAccountBalance(function(balance) {
      res.send(balance);
    });
  });

	// Application route =========================================================
	app.get('/', function (req, res) {
    res.sendfile('index.html', {'root': './public/views/'});
  });


};

}());