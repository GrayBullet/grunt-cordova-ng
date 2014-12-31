var _ = require('underscore');

module.exports.name = 'platform';

module.exports.invoke = function (cordova, grunt, options, async) {
  'use strict';

  var args = _.clone(options.arguments);

  var subCommand = args.shift();
  var platforms = args;

  cordova.platform(subCommand, platforms, options, async);
};
