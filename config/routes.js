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

	// Application route =========================================================
	app.get('/*', function (req, res) {
    res.sendfile('index.html', {'root': './public/views/'});
  });
};

}());