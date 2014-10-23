module.exports = function (command) {
  if (command && command.match(/^(prepare|build|emulate|run)$/)) {
    return require('./' + command + '.js');
  }
};
