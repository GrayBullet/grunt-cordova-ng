var _ = require('underscore');
var cordovaExtra = require('../lib/cordovaExtra.js');

var getTaskName = function (task, command) {
  'use strict';

  var array = _.clone(task.args);
  array.unshift(task.name);

  array[1] = command;

  return array.join(':');
};

var execute = function (command, grunt, options, callback) {
  'use strict';

  var find = require('../lib/find.js');
  // Get cordova wrapper with running 'projectRoot'.
  var cordova = cordovaExtra.create(options.projectRoot);

  find(command).invoke(cordova, grunt, options, function () {
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
    require('cordova').on('results', function (results) {
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

    var done = this.async();

    grunt.log.debug(JSON.stringify(newOptions));

    execute(command, grunt, newOptions, function (error) {
      if (error) {
        grunt.fail.warn(error);
      }

      // Adhoc bugfix:
      //   Do not run ios-simulator at `cordova emulate`
      setTimeout(done, 50);
    });
  });
};
