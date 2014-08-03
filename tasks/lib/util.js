(function() {
  'use strict';

  module.exports = {
    convertCordovaOptions: function(options) {
      var cordovaOptions = {
        platforms: [],
        options: []
      };

      // Convert platform.
      if (options.platforms) {
        cordovaOptions.platforms = Array.isArray(options.platforms) ?
          options.platforms : [ options.platforms ];
      }

      // Convert build type.
      if (options.build && options.build.match(/^(debug|release)$/)) {
        cordovaOptions.options.push('--' + options.build);
      }

      // Convert device type.
      if (options.device && options.device.match(/^(device|emulator)$/)) {
        cordovaOptions.options.push('--' + options.device);
      }

      // Convert target.
      if (options.target) {
        cordovaOptions.options.push('--target=' + options.target);
      }

      return cordovaOptions;
    }
  };
}());
