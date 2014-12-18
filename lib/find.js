module.exports = function (command) {
  if (command && command.match(/^(compile|prepare|build|emulate|run|platform|plugin)$/)) {
    return require('./' + command + '.js');
  }
};
