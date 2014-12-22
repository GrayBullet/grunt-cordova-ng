var _ = require('underscore');
var cordova = require('cordova');

var getTaskName = function (task, command) {
  'use strict';

  var array = _.clone(task.args);
  array.unshift(task.name);

  array[1] = command;

  return array.join(':');
};

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

  grunt.registerTask('cordova', 'Run cordova command.', function (command, build) {
    // 'cordova:package' task is ['cordova:build', 'cordova:package-files']
    if (command === 'package') {
      grunt.task.run([
        getTaskName(this, 'build'),
        getTaskName(this, 'package-files')
      ]);
      return;
    }

    // Show run cordova results.
    cordova.on('results', function (results) {
      grunt.log.writeln(results);
    });

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

    if (command === 'package-files') {
      var packageFiles = (require('../lib/findPackage'))(newOptions);
      packageFiles(grunt, newOptions);
    } else {
      var done = this.async();

      execute(command, newOptions, function (error) {
        if (error) {
          grunt.fail.warn(error);
        }
        done();
      });
    }
  });
};
