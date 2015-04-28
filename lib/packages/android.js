var copyApks = function (grunt, options, path) {
  'use strict';

  var util = require('./util')(grunt,
                               options,
                               'android',
                               path);

  var build = options.build || 'debug';

  // Create dist dir.
  util.mkdirpSync();

  // Copy apk files.
  util.globSync('**/*-' + build + '*.apk')
    .forEach(function (file) {
      util.copySync(file, file);
    });
};

module.exports = function (grunt, options, callback) {
  'use strict';

  copyApks(grunt, options, 'ant-build'); // ant build.
  copyApks(grunt, options, 'build/outputs/apk'); // Gradle build.

  callback();
};
