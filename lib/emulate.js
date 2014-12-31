module.exports.name = 'emulate';

module.exports.invoke = function (cordova, grunt, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.emulate(util.convertCordovaOptions(options), async);
};
