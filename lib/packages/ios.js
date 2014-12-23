var fs = require('fs-extra');
var path = require('path');
var execFile = require('child_process').execFile;
var _ = require('underscore');

var copyAppFiles = function (util, grunt, sourceDirectory, destinationDirectory, callback) {
  'use strict';

  util.globSync('*.app')
    .forEach(function (file) {
      util.copySync(file, file);
    });

  callback();
};

var xcrunPackage = function (util, source, destination, callback) {
  'use strict';

  var name = path.basename(source, '.app');
  var ipa = name + '.ipa';
  var ipaPath = path.join(destination, ipa);

  util.log('Copy to ' + ipaPath + '.');

  // Create dist directory.
  util.mkdirpSync();

  // Create ipa file.
  var args = [
    '-sdk',
    'iphoneos',
    'PackageApplication',
    path.join(process.cwd(), source),
    '-o',
    path.join(process.cwd(), ipaPath)
  ];
  execFile('xcrun', args, callback);
};

var packageIpa = function (util, grunt, sourceDirectory, destinationDirectory, callback) {
  'use strict';

  var file = _.first(util.globSync('*.app'));

  if (file) {
    var source = util.source.resolve(file);
    var destination = path.join(util.destination.resolve());

    xcrunPackage(util, source, destination, callback);
  }
};

module.exports = function (grunt, options, callback) {
  'use strict';

  var device = options.device || 'emulator';

  var util = require('./util')(grunt,
                               options,
                               'ios',
                               path.join('build', device));

  var sourceDirectory = path.join(options.projectRoot,
                                  'platforms/ios/build',
                                  device);
  var destinationDirectory = path.join((options.dist || 'dist'),
                                       'ios',
                                       device);

  if (device === 'device') {
    // Device build.
    // Make ipa file.
    packageIpa(util, grunt, sourceDirectory, destinationDirectory, callback);
  } else {
    // Emulator build.
    // Copy files.
    copyAppFiles(util, grunt, sourceDirectory, destinationDirectory, callback);
  }
};
