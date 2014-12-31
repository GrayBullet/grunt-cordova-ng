var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

module.exports.name = 'package-files';

module.exports.invoke = function (cordova, grunt, options, callback) {
  'use strict';

  var packageFiles = (require('./findPackage'))(options);
  packageFiles(grunt, options, callback);
};
