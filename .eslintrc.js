module.exports = {
  extends: 'google',
  env: {
    node: true,
    jasmine: true
  },
  rules: {
    'max-len': [1, 120],
    'space-before-function-paren': [1, {anonymous: 'always', named: 'never'}]
  }
};
