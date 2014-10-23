module.exports = function (grunt) {
  'use strict';

  var config = {
    javascripts: [
      'Gruntfile.js',
      'lib/**/*.js',
      'tasks/**/*.js',
      'test/**/*.js'
    ]
  };

  grunt.initConfig({
    jshint: {
      all: config.javascripts
    },

    jscs: {
      all: config.javascripts
    },

    'jasmine_node': {
      all: [
        'test/'
      ]
    }
  });

  // Load grunt tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('jscheck', ['jshint', 'jscs']);
  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('default', ['jscheck', 'test']);
};
