module.exports = function(command) {
  if (command && command.match(/^(build|emulate|run)$/)) {
    return require('./' + command + '.js');
  }
};
