/*jslint node: true*/
/*globals expect:true, Promise: true, Symbol: true, describe: true, it: true, before: true, after: true*/
"use strict";

const 
	restify = require('restify'),
	versioningMiddleware = require('../index.js')()
	;

describe("Versioning", function () {
    it("Should accept URL string as valid version (i.e. v1,v2,...)", function () {
        versioningMiddleware({url:'/v1'}, null, function(result){
			expect(result).to.be.undefined;
		})
    });
	
	it("Should accept URL string containing default prefix as valid version", function () {
        versioningMiddleware({url:'/api/v1'}, null, function(result){
			expect(result).to.be.undefined;
		})
    });
	
	it("Should accept URL string containing non-default prefix as valid version", function () {
		const versioningMiddlewarePrefix = require('../index.js')('prefix')
        versioningMiddlewarePrefix({url:'/prefix/v1'}, null, function(result){
			expect(result).to.be.undefined;
		})
    });
	
	it("Should throw exception if prefix is different to the one previosly defined", function () {
        versioningMiddleware({url:'/prefix/v1'}, null, function(result){
			expect(result).to.be.an.instanceof(restify.InvalidVersionError)
		})
    });
	
	it("Should throw exception if no version is defined in URL", function () {
        versioningMiddleware({url:'/prefix/'}, null, function(result){
			expect(result).to.be.an.instanceof(restify.InvalidVersionError)
		})
    });
	
	


});
