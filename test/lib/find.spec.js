(function() {
  'use strict';

  var find = require('../../tasks/lib/find.js');

  describe('find', function() {
    [ 'build', 'run', 'emulate' ].forEach(function(name) {
      it('find "' + name + '".', function() {
        var result = find(name);

        expect(result).toBeDefined();
        expect(result.name).toEqual(name);
      });
    });
  });
})();
