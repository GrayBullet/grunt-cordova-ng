module.exports.name = 'emulate';

module.exports.invoke = function (cordova, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.emulate(util.convertCordovaOptions(options), async);
};
