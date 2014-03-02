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

	// Application route =========================================================
	app.get('/*', function (req, res) {
    res.sendfile('index.html', {'root': './public/views/'});
  });
};

}());