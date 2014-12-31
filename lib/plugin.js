var _ = require('underscore');

module.exports.name = 'plugin';

module.exports.invoke = function (cordova, grunt, options, async) {
  'use strict';

  var args = _.clone(options.arguments);

  var subCommand = args.shift();
  var plugins = args;

  cordova.plugin(subCommand, plugins, options, async);
};
