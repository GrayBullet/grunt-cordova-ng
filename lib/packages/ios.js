var path = require('path');
var execFile = require('child_process').execFile;
var fs = require('fs-extra');
var _ = require('underscore');

var copyAppFiles = function (util, callback) {
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
  fs.mkdirpSync(destination);

  // Create ipa file.
  var args = [
    '-sdk',
    'iphoneos',
    'PackageApplicationFixed',
    path.join(process.cwd(), source),
    '-o',
    path.join(process.cwd(), ipaPath)
  ];
  execFile('xcrun', args, callback);
};

var packageIpa = function (util, callback) {
  'use strict';

  var file = _.first(util.globSync('*.app'));

  if (file) {
    var source = util.source.resolve(file);
    var destination = util.destination.resolve();

    xcrunPackage(util, source, destination, callback);
  }
};

module.exports = function (grunt, options, callback) {
  'use strict';

  var device = options.device || 'emulator';

  var util = require('./util')(grunt,
                               options,
                               'ios',
                               path.join('build', device),
                               device);

  if (device === 'device') {
    // Device build.
    // Make ipa file.
    packageIpa(util, callback);
  } else {
    // Emulator build.
    // Copy files.
    copyAppFiles(util, callback);
  }
};
