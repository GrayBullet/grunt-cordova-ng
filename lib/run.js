module.exports.name = 'run';

module.exports.invoke = function(cordova, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.run(util.convertCordovaOptions(options), async);
};
