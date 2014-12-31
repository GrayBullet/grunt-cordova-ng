var cordova = require('cordova');
var _ = require('underscore');
var createEnvironment = require('./environment.js').create;

var wrapCallback = function (environment, callback) {
  'use strict';

  return function () {
    // Restore current directory.
    environment.restoreCurrentDirectory();

    if (callback) {
      return callback.apply(null, arguments);
    }

    return undefined;
  };
};

var wrapFunction = function (environment, f) {
  'use strict';

  return function () {
    var args = _.toArray(arguments);

    // Change directory to cordova project.
    environment.changeProjectRoot();

    if (args.length > 0) {
      var callback = args.pop();
      if (_.isFunction(callback)) {
        // Include callback.
        // [a, b, callback] -> [a, b, wrapped callback]
        callback = wrapCallback(environment, callback);
      } else {
        // No callback.
        // [a, b] -> [a, b, restore current directory function]
        args.push(callback);
        callback = wrapCallback(environment);
      }
      args.push(callback);
    }

    return f.apply(cordova, args);
  };
};

module.exports.create = function (projectRoot) {
  'use strict';

  if (!projectRoot) {
    return cordova;
  }

  var environment = createEnvironment(projectRoot);

  return _.chain(cordova)
    .functions().map(function (name) {
      return [name, cordova[name]];
    })
    .map(function (f) {
      return [f[0], wrapFunction(environment, f[1])];
    })
    .object()
    .value();
};
