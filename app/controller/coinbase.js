'use strict';

(function() {

  var clientId = "3269be233ce0aa999225b743445b543d92df4c5e9a79d6eb54fedd02bef75fe6";
  var clientSecret = "8ad715ebb4b0481aefe17f03db4a22c998775e1ef52e8c4c0f80ab9297e130fa";
  var callbackUrl = "http://67fd428c.ngrok.com/coinbase/callback";
  var https = require('https');
  var accessToken, refreshToken;

  module.exports = {

    // OAuth shit

    getCoinbaseAuthUrl: function () {
      console.log("getting redirect url")
      var baseUrl = 'https://coinbase.com/oauth/authorize?';
      var params = toParam({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: callbackUrl
      });
      return baseUrl + params;
    },

    refreshTokens: function (callback) {
      console.log("refreshing tokens")
      var params = toParam({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      });
      requestAccessToken(params, callback);
    },

    getAccessToken: function (code, callback) {
      console.log("getting access token url")
      var params = toParam({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: callbackUrl,
        client_id: clientId,
        client_secret: clientSecret
      });
      requestAccessToken(params, callback);
    },

    // API stuff

    getAccountBalance: function (callback) {
      console.log("getting account balance");
      makeHTTPSRequest('GET', '/api/v1/account/balance', true, function (res) {
        if (!res) {
          callback({
            err: "permission denied",
            msg: "no access or refresh token. please authorize!"
          });
        } else {
          callback(res);
        }
      });
    }

  }

  // Private
  var makeHTTPSRequest = function (type, url, withAccessToken, callback) {
    if (withAccessToken && typeof accessToken === 'undefined') {
      callback(false);
    } else {
      var options = {
        method: type,
        host: 'coinbase.com',
        path: (withAccessToken) ? url  + '?access_token=' + accessToken : url
      }
      var req = https.request(options, function(res) {
        var output = ''
        res.on('data', function (chunk) {
          output += chunk;
        });
        res.on('end', function() {
          callback(JSON.parse(output));
        });
      });
      req.end();
    }
  }

  var toParam = function (obj) {
    var str = ''
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        str += key + '=' + obj[key] + '&'
      }
    }
    return str.substring(0, str.length - 1);
  }

  var requestAccessToken = function (params, callback) {
    makeHTTPSRequest('POST', '/oauth/token?' + params, false, function(res) {
      accessToken = res.access_token;
      refreshToken = res.refresh_token;
      callback();
    });
  }

}());
