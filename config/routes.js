'use strict';

(function() {

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
  app.post('/api/oauth', function (req, res) {
    // When someone logs in, POST to this.

  });
// Redirect the user to this page
// https://coinbase.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL

// If the user accepts, they will be redirected to:
// YOUR_CALLBACK_URL?code=CODE

# Initiate a POST request to get the access token
https://coinbase.com/oauth/token?grant_type=authorization_code&code=CODE&redirect_uri=YOUR_CALLBACK_URL&client_id=CLIENT_ID&client_secret=CLIENT_SECRET

# Response containing the 'access_token'
{
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "bearer",
    "expire_in": 7200,
    "scope": "universal"
}

# Now you can use the 'access_token' to initiate authenticated requested
https://coinbase.com/api/v1/account/balance?access_token=...

# Response
{"amount"=>"50.00000000", "currency"=>"BTC"}





	// Application route =========================================================
	app.get('/*', function (req, res) {
    res.sendfile('index.html', {'root': './public/views/'});
  });
};

}());