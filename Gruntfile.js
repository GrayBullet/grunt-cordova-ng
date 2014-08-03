module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ]
    },

    jasmine_node: {
      all: [
        'test/',
      ]
    }
  });

  // Load grunt tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
};
