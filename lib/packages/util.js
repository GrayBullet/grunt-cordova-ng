var fs = require('fs-extra');
var path = require('path');
var _ = require('underscore');
var glob = require('glob');

var makeDirectoryUtil = function (util, directory) {
  'use strict';

  return {
    existsSync: function () {
      return fs.existsSync(this.resolve.apply(this, arguments));
    },
    resolve: function () {
      return path.join.apply(path, [directory].concat(_.toArray(arguments)));
    },
    copySync: function (src, dest) {
      var source = this.resolve(src);
      var destination = util.destination.resolve(dest);

      util.log('Copy to ' + destination + '.');
      return fs.copySync(source, destination);
    }
  };
};

var createUtil = function (grunt, options, platform, source, destination) {
  'use strict';

  var local = {
    source: path.join(options.projectRoot, 'platforms', platform, source),
    destination: path.join(options.dist || 'dist', platform, destination || '')
  };

  var util = {
  };

  return _.extend(util, {
    mkdirpSync: function () {
      return fs.mkdirpSync(this.destination.resolve.apply(this.destination, arguments));
    },
    copySync: function () {
      return this.source.copySync.apply(this.source, arguments);
    },
    globSync: function (pattern, options) {
      options = _.defaults(options || {}, {
        cwd: this.source.resolve()
      });
      return glob.sync(pattern, options);
    },
    source: makeDirectoryUtil(util, local.source),
    destination: makeDirectoryUtil(util, local.destination),
    log: _.bind(grunt.log.writeln, grunt.log)
  });
};

module.exports = createUtil;
