var _ = require('underscore');
var fs = require('fs-extra');
var glob = require('glob');
var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

var packageApk = function (grunt, options, callback) {
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

var packageIos = function (grunt, options, callback) {
  'use strict';

  var device = options.device || 'emulator';

  var sourceDirectory = path.join(options.projectRoot,
                                  'platforms/ios/build',
                                  device);
  var destinationDirectory = path.join((options.dist || 'dist'),
                                      'ios',
                                      device);

  grunt.log.writeln('');

  if (device === 'device') {
    // Device build.
    // Make ipa file.
    var appFile = glob.sync('*.app', {
      cwd: sourceDirectory
    })[0];
    var fullSource = path.join(process.cwd(), sourceDirectory, appFile);
    var destination = path.join(destinationDirectory,
                                path.basename(appFile, '.app') + '.ipa');
    var fullDestination = path.join(process.cwd(), destination);
    grunt.log.writeln('Copy to ' + destination + '.');

    fs.mkdirpSync(destinationDirectory);
    execFile('xcrun', ['-sdk', 'iphoneos', 'PackageApplication', fullSource, '-o', fullDestination], callback);
  } else {
    // Emulator build.
    // Copy files.
    var files = glob.sync('*.app', {
      cwd: sourceDirectory
    });

    files.forEach(function (file) {
      var source = path.join(sourceDirectory, file);
      var destination = path.join(destinationDirectory, file);
      grunt.log.writeln('Copy to ' + destination + '.');

      fs.copySync(source, destination);
    });

    callback();
  }
};

var getPackageFunction = function (platform) {
  'use strict';

  if (platform === 'android') {
    return packageApk;
  } else if (platform === 'ios') {
    return packageIos;
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
