module.exports.name = 'build';

module.exports.invoke = function(cordova, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.build(util.convertCordovaOptions(options), async);
};
