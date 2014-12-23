module.exports = function (grunt, options, callback) {
  'use strict';

  var util = require('./util')(grunt, options, 'android', 'ant-build');

  var build = options.build || 'debug';

  // Create dist dir.
  util.mkdirpSync();

  // Copy apk files.
  util.globSync('**/*-' + build + '*.apk')
    .forEach(function (file) {
      util.copySync(file, file);
    });

  callback();
};
