module.exports.name = 'package-files';

module.exports.invoke = function (cordova, grunt, options, callback) {
  'use strict';

  var packageFiles = (require('./findPackage'))(options);
  packageFiles(grunt, options, callback);
};
