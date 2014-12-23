var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

module.exports = function (grunt, options, callback) {
  'use strict';

  var build = options.build || 'debug';

  var sourceDirectory = path.join(options.projectRoot,
                                  'platforms/android/ant-build');
  var destinationDirectory = path.join((options.dist || 'dist'),
                                       'android');

  fs.mkdirpSync(destinationDirectory);
  var files = glob.sync('**/*-' + build + '*.apk', {
    cwd: sourceDirectory
  });

  grunt.log.writeln('');

  files.forEach(function (file) {
    var source = path.join(sourceDirectory, file);
    var destination = path.join(destinationDirectory, file);
    grunt.log.writeln('Copy to ' + destination + '.');

    fs.copySync(source, destination);
  });

  callback();
};
