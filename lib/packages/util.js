var fs = require('fs-extra');
var path = require('path');
var _ = require('underscore');
var glob = require('glob');

var createUtil = function (grunt, options, platform, source, destination) {
  'use strict';

  var local = {
    source: path.join(options.projectRoot, 'platforms', platform, source),
    destination: path.join(options.dist || 'dist', platform, destination || '')
  };

  return {
    mkdirpSync: function () {
      return fs.mkdirpSync(this.destination.resolve.apply(this.destination, arguments));
    },
    copySync: function (src, dest) {
      var source = this.source.resolve(src);
      var destination = this.destination.resolve(dest);

      this.log('Copy to ' + destination + '.');
      return fs.copySync(source, destination);
    },
    globSync: function (pattern, options) {
      options = _.defaults(options || {}, {
        cwd: this.source.resolve()
      });
      return glob.sync(pattern, options);
    },
    source: {
      resolve: function () {
        return path.join.apply(path, [local.source].concat(_.toArray(arguments)));
      }
    },
    destination: {
      resolve: function () {
        return path.join.apply(path, [local.destination].concat(_.toArray(arguments)));
      }
    },
    log: _.bind(grunt.log.writeln, grunt.log)
  };
};

module.exports = createUtil;
