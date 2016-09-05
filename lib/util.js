'use strict';

var _ = require('underscore');

// Default options by build type.
var overrideOptions = {
  debug: {
    build: 'debug',
    device: 'emulator'
  },
  release: {
    build: 'release',
    device: 'device'
  }
};

var getArrayOption = function (text) {
  if (text === undefined || text === null) {
    return text;
  }

  if (text.length <= 0) {
    return [];
  }

  return text.split(',')
    .map(function (s) {
      return s.trim();
    });
};

var appendOption = function (options, field, value) {
  if (value !== undefined && value !== null) {
    options[field] = value;
  }
};

module.exports = {
  getEnvironmentOptions: function (optEnvironment) {
    var env = optEnvironment || process.env;
    var options = {};

    // GRUNT_CORDOVA_NG_PLATFORMS -> options.platforms
    appendOption(options, 'platforms', getArrayOption(env.GRUNT_CORDOVA_NG_PLATFORMS));

    // GRUNT_CORDOVA_NG_BUILD -> options.build
    appendOption(options, 'build', env.GRUNT_CORDOVA_NG_BUILD);

    // GRUNT_CORDOVA_NG_DEVICE -> options.device
    appendOption(options, 'device', env.GRUNT_CORDOVA_NG_DEVICE);

    // GRUNT_CORDOVA_NG_TARGET -> options.target
    appendOption(options, 'target', env.GRUNT_CORDOVA_NG_TARGET);

    return options;
  },

  getGruntArgumentsOptions: function (optGrunt) {
    if (!optGrunt) {
      return {};
    }

    var options = {};

    // --cordova-platforms -> options.platforms
    appendOption(options,
                 'platforms',
                 getArrayOption(optGrunt.option('cordova-platforms')));

    // --cordova-build -> options.build
    appendOption(options,
                 'build',
                 optGrunt.option('cordova-build'));

    // --cordova-device -> options.device
    appendOption(options,
                 'device',
                 optGrunt.option('cordova-device'));

    // --cordova-target -> options.target
    appendOption(options,
                 'target',
                 optGrunt.option('cordova-target'));

    return options;
  },

  getOverrideOptions: function (build) {
    return overrideOptions[build];
  },

  getCustomOptions: function (options, build) {
    return options[build + 'Options'];
  },

  convertCordovaOptions: function (options) {
    var cordovaOptions = {
      platforms: [],
      options: []
    };

    // Convert platform.
    if (options.platforms) {
      cordovaOptions.platforms = Array.isArray(options.platforms) ?
        options.platforms : [options.platforms];
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
  },

  mergeOptions: function (options, build, optGrunt, optEnvironment) {
    return _.extend({projectRoot: ''},
                    options,
                    this.getOverrideOptions(build),
                    this.getCustomOptions(options, build),
                    this.getEnvironmentOptions(optEnvironment),
                    this.getGruntArgumentsOptions(optGrunt));
  }
};
