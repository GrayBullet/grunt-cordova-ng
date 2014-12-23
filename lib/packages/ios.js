var path = require('path');
var execFile = require('child_process').execFile;
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
  util.mkdirpSync('device');

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
    var destination = path.join(util.destination.resolve('device'));

    xcrunPackage(util, source, destination, callback);
  }
};

var copyProvisioningProfiles = function (util) {
  'use strict';

  if (util.resource.existsSync('mobileprovisions')) {
    util.resource.copySync('mobileprovisions', 'mobileprovisions');
  }
};

module.exports = function (grunt, options, callback) {
  'use strict';

  var device = options.device || 'emulator';

  var util = require('./util')(grunt,
                               options,
                               'ios',
                               path.join('build', device));

  if (device === 'device') {
    // Device build.

    // Copy provisioning profiles.
    copyProvisioningProfiles(util);

    // Make ipa file.
    packageIpa(util, callback);
  } else {
    // Emulator build.
    // Copy files.
    copyAppFiles(util, callback);
  }
};
