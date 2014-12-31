module.exports.name = 'run';

module.exports.invoke = function (cordova, grunt, options, async) {
  'use strict';

  var util = require('./util.js');

  cordova.run(util.convertCordovaOptions(options), async);
};
