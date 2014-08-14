module.exports = function(grunt) {
  'use strict';

  var cordova = require('cordova');
  var _ = require('underscore');
  var util = require('../lib/util.js');

  var overrideOptions = {
    debug: {
      build: 'debug',
      device: 'emulater'
    },
    release: {
      build: 'release',
      device: 'device'
    }
  };

  grunt.registerTask('cordova', 'Run cordova command.', function(command, build) {
    var find = require('../lib/find.js');

    var options = this.options({
      platforms: [],
      build: '',
      device: '',
      target: ''
    });

    // Mix options.
    //
    // 1. Default user options.
    // grunt.initConfig({build: 'debug', ...});
    //
    // 2. Override build type options.
    // overrideOptions['debug']
    //
    // 3. Custom config by build options.
    // grunt.initConfig(cordova: {debugOptions: {build: 'debug'}});
    options = util.mergeOptions(options, build);

    grunt.log.debug(JSON.stringify(options));

    find(command).invoke(cordova, options, this.async());
  });
};
