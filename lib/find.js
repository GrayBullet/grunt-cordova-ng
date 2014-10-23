module.exports = function (command) {
  if (command && command.match(/^(compile|prepare|build|emulate|run)$/)) {
    return require('./' + command + '.js');
  }
};
