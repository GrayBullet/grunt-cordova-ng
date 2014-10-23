var createNullEnvironment = function () {
  'use strict';

  return {
    changeProjectRoot: function () {},
    restoreCurrentDirectory: function () {}
  };
};

var createEnvironment = function (root) {
  'use strict';

  var current = process.cwd();
  var rootAbsolete = require('path').resolve(root);

  return {
    changeProjectRoot: function () {
      process.chdir(rootAbsolete);
    },
    restoreCurrentDirectory: function () {
      process.chdir(current);
    }
  };
};

module.exports.create = function (root) {
  'use strict';

  return root ? createEnvironment(root) : createNullEnvironment();
};
