module.exports.name = 'prepare';

module.exports.invoke = function (cordova, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.prepare(util.convertCordovaOptions(options), async);
};
