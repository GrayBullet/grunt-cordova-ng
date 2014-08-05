module.exports = function(grunt) {
  'use strict';

  var cordova = require('cordova');

  grunt.registerTask('cordova', 'Run cordova command.', function(command) {
    var find = require('../lib/find.js');

    var options = this.options({
      platforms: [],
      build: '',
      device: '',
      target: ''
    });

    find(command).invoke(cordova, options, this.async());
  });
};
