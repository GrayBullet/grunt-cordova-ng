var path = require('path');

module.exports = function (grunt, options, callback) {
  'use strict';

  var util = require('./util')(grunt,
                               options,
                               'firefoxos',
                               './');

  // Create dist dir.
  util.mkdirpSync();

  // Copy zip files.
  util.globSync('build/*.zip')
    .forEach(function (file) {
      util.copySync(file, path.basename(file));
    });

  // Copy www files.
  util.copySync('www', 'www');

  callback();
};
