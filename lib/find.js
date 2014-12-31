module.exports = function (command) {
  'use strict';

  if (command && command.match(/^(compile|prepare|build|emulate|run|platform|plugin|package-files)$/)) {
    return require('./' + command + '.js');
  }
};
