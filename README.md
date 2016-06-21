![](sidimansour.png)

# restify-versioning-middleware

A module that offers a function that can be user as a [restify.js](http://restify.com) middleware. The module will check incoming calls (as a PRE handler in Restify) and will throw an `InvalidVersionError` when no version has been received in neither URL nor request headers.

> Note: root URL "/" is always accepted as valid

## Install
```
npm install --save restify-versioning-middleware
```

## Purpose
To provide a component that can act as a PRE handler in Restify server to check the existence and validity of the requested api version. 


## Configuration
The module is integrated with [unless.js](https://github.com/jfromaniello/express-unless "unless.js") module (to conditionally skip a middleware when a condition is met). This is useful for applications `heartbeat` and also for other particular routes that do not need the versioning parameter to function correctly.

## Examples of usage

	server.pre(versioningMiddleware().unless({path: getExceptedRoutes() }));

Require authentication for every request unless the path is index.html.

	server.pre(versioningMiddleware().unless({
	  path: [
	    '/index.html',
	    { url: '/', methods: ['GET', 'PUT']  }
	  ]
	}))

Avoid a fstat for request to routes doesn't end with a given extension.

	server.pre(versioningMiddleware().unless(function (req) {
	  var ext = url.parse(req.originalUrl).pathname.substr(-4);
	  return !~['.jpg', '.html', '.css', '.js'].indexOf(ext);
	}));

## Testing
run all tests  
`npm test`


## License
Copyright (c) 2016 SidiMansourJs.
Licensed under the [MIT license](LICENSE.md).
