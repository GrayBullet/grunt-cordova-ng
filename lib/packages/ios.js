var fs = require('fs-extra');
var glob = require('glob');
var path = require('path');
var execFile = require('child_process').execFile;

var copyAppFiles = function (grunt, sourceDirectory, destinationDirectory, callback) {
  'use strict';

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
};

var packageIpa = function (grunt, sourceDirectory, destinationDirectory, callback) {
  'use strict';

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
};

module.exports = function (grunt, options, callback) {
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
    packageIpa(grunt, sourceDirectory, destinationDirectory, callback);
  } else {
    // Emulator build.
    // Copy files.
    copyAppFiles(grunt, sourceDirectory, destinationDirectory, callback);
  }
};
