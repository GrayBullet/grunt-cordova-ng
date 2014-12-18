(function () {
  'use strict';

  var command = require('../../lib/platform.js');
  var asyncStub = 'ASYNC';

  describe('platform', function () {
    it('name', function () {
      expect(command.name).toEqual('platform');
    });

    it('invoke add', function () {
      var mock = jasmine.createSpyObj('mock', ['platform']);

      var options = {
        arguments: ['add', 'platform1', 'platform2']
      };

      command.invoke(mock, options, asyncStub);

      expect(mock.platform)
        .toHaveBeenCalledWith('add', ['platform1', 'platform2'], options, asyncStub);
    });
  });
})();
