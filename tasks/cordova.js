var _ = require('underscore');
var cordova = require('cordova');

var execute = function (command, options, callback) {
  'use strict';

  var find = require('../lib/find.js');
  var createEnvironment = require('../lib/environment.js').create;

  // Change directory to cordova project.
  var environment = createEnvironment(options.projectRoot);
  environment.changeProjectRoot();

  find(command).invoke(cordova, options, function () {
    // Restore current directory.
    environment.restoreCurrentDirectory();

    callback.apply(null, arguments);
  });

};

module.exports = function (grunt) {
  'use strict';

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

  grunt.registerTask('cordova', 'Run cordova command.', function (command, build) {
    // Show run cordova results.
    cordova.on('results', function (results) {
      grunt.log.writeln(results);
    });

    var done = this.async();
    var args = _.toArray(arguments);
    args.shift();

    var options = this.options({
      platforms: [],
      build: '',
      device: '',
      target: '',
      arguments: args
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
    // grunt.initConfig(cordova: {options: {debugOptions: {build: 'debug'}}});
    //
    // 4. Envrinoment variable config.
    // export GRUNT_CORDOVA_NG_BUILD=debug
    //
    // 5. Grunt arguments.
    // grunt cordova:build --cordova-build=debug
    var newOptions = util.mergeOptions(options, build, grunt);

    grunt.log.debug(JSON.stringify(newOptions));

    execute(command, newOptions, function (error) {

      if (error) {
        grunt.fail.warn(error);
      }

      done();
    });
  });
};
