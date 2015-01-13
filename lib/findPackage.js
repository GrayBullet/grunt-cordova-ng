var path = require('path');
var glob = require('glob');
var _ = require('underscore');

var getPackageFunction = function (platform) {
  'use strict';

  return platform.match(/^android|ios$/) ?
    require('./packages/' + platform) :
    function (grunt, options, callback) {
      grunt.log.warn('Cannot support ' + platform + ' platform.');

      // Unsupported platform is ran, but not error.
      callback();
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

var copyResources = function (base, source, destination) {
  'use strict';

  source = path.join(base, 'resources', source);
  if (destination) {
    destination = path.join('dist', destination);
  }

  if (require('fs-extra').existsSync(source)) {
    require('fs-extra').copySync(source, destination);
  }
};

var copyResourcesAllPlatform = function (options, source) {
  'use strict';

  getPlatforms(options).forEach(function (platform) {
    copyResources(source, platform, platform);
  });
  copyResources(source, 'root', '.');
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

    // Copy resource files to destination directory.
    // node_modules/grunt-cordova-ng/resources/android -> dist/android
    // node_modules/grunt-cordova-ng/resources/root -> dist
    copyResourcesAllPlatform(options, 'node_modules/grunt-cordova-ng');

    // Copy custom resource files to destination directory.
    // resources/android -> dist/android
    // resources/root -> dist
    copyResourcesAllPlatform(options, '.');
  };
};
