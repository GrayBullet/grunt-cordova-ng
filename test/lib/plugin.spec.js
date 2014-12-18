(function () {
  'use strict';

  var command = require('../../lib/plugin.js');
  var asyncStub = 'ASYNC';

  describe('plugin', function () {
    it('name', function () {
      expect(command.name).toEqual('plugin');
    });

    it('invoke add', function () {
      var mock = jasmine.createSpyObj('mock', ['plugin']);

      var options = {
        arguments: ['add', 'plugin1', 'plugin2']
      };

      command.invoke(mock, options, asyncStub);

      expect(mock.plugin)
        .toHaveBeenCalledWith('add', ['plugin1', 'plugin2'], options, asyncStub);
    });
  });
})();
