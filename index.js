"use strict";
const
    restify = require('restify'),
    semver      = require("semver"),
    PREFIX_API  = "/api/"
    ;

module.exports = function(exceptedRoutes) {

  var versioningMiddleware = function versioningMiddleware (req, res, next){

      req.url = req.url.replace(PREFIX_API, '');

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
            let except      = exceptedRoutes;

            let isExcepted  = false;

            for (var i = except.length; i--;){
              if(req.url.indexOf(except[i]) > -1){
                isExcepted = true;
                break;
              }
            }

            if(!isExcepted)
              return next(new restify.InvalidVersionError('This is an invalid version'));
          }

      }

      next();
  }


  return versioningMiddleware;
};
