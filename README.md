# restify-versioning-middleware

A module that offers a function that can be user as a [restify.js](http://restify.com) middleware. The module will check incoming calls (as a PRE handler in Restify) and will throw an `InvalidVersionError` when no version has been received in neither URL not request headers.


## Install
```
npm install --save restify-versioning-middleware
```

## Purpose
To provide a component that can act as a PRE handler in Restify server to check the existence and validity of the requested api version. 


## Configuration
The module accepts a parameter to except specific routes from the versioning middleware. This is useful for applications `heartbeat` and also for other particular routes that do not need the versioning parameter to function correctly.


## Testing
run all tests  
`npm test`


## License
Copyright (c) 2016 SidiMansourJs.
Licensed under the [MIT license](LICENSE.md).
