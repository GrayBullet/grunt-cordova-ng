module.exports.name = 'prepare';

module.exports.invoke = function (cordova, grunt, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.prepare(util.convertCordovaOptions(options), async);
};
