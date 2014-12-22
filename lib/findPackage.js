var _ = require('underscore');
var fs = require('fs-extra');
var glob = require('glob');
var path = require('path');

var packageApk = function (grunt, options) {
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
};

var getPackageFunction = function (platform) {
  'use strict';

  if (platform === 'android') {
    return packageApk;
  }

  return function (grunt) {
    grunt.log.warn('Cannot support ' + platform + ' platform.');
  };
};

var getPlatforms = function (options) {
  'use strict';

  if (options.platforms.length > 0) {
    return options.platforms;
  } else {
    return glob.sync('*', {
      cwd: path.join(options.projectRoot, 'platforms')
    });
  }
};

module.exports = function (options) {
  var platforms = getPlatforms(options);
  var packageFunctions = platforms.map(getPackageFunction);

  return function () {
    var args = _.toArray(arguments);

    packageFunctions.forEach(function (packageFunction) {
      packageFunction.apply(null, args);
    });
  };
};
