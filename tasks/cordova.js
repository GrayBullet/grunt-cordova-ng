module.exports = function(grunt) {
  'use strict';

  var cordova = require('cordova');

  grunt.registerTask('cordova', 'Run cordova command.', function(command) {
    var find = require('./lib/find.js');

    var options = this.options({
      platforms: [],
      build: '',
      device: '',
      target: ''
    });

    find(command).invoke(cordova, options, this.async());
  });

  grunt.registerTask('cordova-build', 'Run cordova build command.', [ 'cordova:build' ]);
  grunt.registerTask('cordova-emulate', 'Run cordova emulate command.', [ 'cordova:emulate' ]);
  grunt.registerTask('cordova-run', 'Run cordova run command.', [ 'cordova:run' ]);
};
