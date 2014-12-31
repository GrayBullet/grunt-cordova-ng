module.exports.name = 'compile';

module.exports.invoke = function (cordova, grunt, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.compile(util.convertCordovaOptions(options), async);
};
