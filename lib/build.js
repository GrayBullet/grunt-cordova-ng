module.exports.name = 'build';

module.exports.invoke = function(cordova, options, async) {
  'use strict';

  var util = require('./util.js');

  // Filter known options.
  // 'cordova build' command douse not use '--target' option.
  var filtered = {};
  ['platforms', 'build', 'device'].forEach(function(name) {
    if (options[name]) {
      filtered[name] = options[name];
    }
  });

  cordova.build(util.convertCordovaOptions(filtered), async);
};
