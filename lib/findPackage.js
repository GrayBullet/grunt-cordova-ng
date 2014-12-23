var _ = require('underscore');
var glob = require('glob');
var path = require('path');

var getPackageFunction = function (platform) {
  'use strict';

  return platform.match(/^android|ios$/) ?
    require('./packages/' + platform) :
    function (grunt) {
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
  'use strict';

  var platforms = getPlatforms(options);
  var packageFunctions = platforms.map(getPackageFunction);

  return function () {
    var args = _.toArray(arguments);

    packageFunctions.forEach(function (packageFunction) {
      packageFunction.apply(null, args);
    });
  };
};
