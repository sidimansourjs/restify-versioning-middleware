"use strict";
const
    restify = require('restify'),
    semver      = require("semver"),
    unless = require('express-unless'),
    PREFIX_API  = "/api/"
    ;

module.exports = module.exports = function(prefix) {

  var versioningMiddleware = function versioningMiddleware (req, res, next){

      req.url = req.url.replace(prefix || PREFIX_API, '');

      let pieces = req.url.replace(/^\/+/, '').split('/');
      let version = pieces[0];

      version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3');
      version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0');
      version = version.replace(/v(\d{1})/, '$1.0.0');

      if (semver.valid(version)) {

        req.url = req.url.replace(pieces[0], '');
        req.headers = req.headers || [];
        req.headers['accept-version'] = version;

      } else {

        if(req.url !== '/'){
              return next(new restify.InvalidVersionError('This is an invalid version'));
          }

      }

      next();
  }

  versioningMiddleware.unless = unless;

  return versioningMiddleware;
};
