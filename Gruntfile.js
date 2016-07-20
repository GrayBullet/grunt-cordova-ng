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
    eslint: {
      target: config.javascripts
    },

    jasmine_node: { // eslint-disable-line camelcase
      all: [
        'test/'
      ]
    }
  });

  // Load grunt tasks.
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('jscheck', ['eslint']);
  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('fulltest', ['jscheck', 'test']);
  grunt.registerTask('default', ['fulltest']);
};
