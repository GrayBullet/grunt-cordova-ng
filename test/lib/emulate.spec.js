(function () {
  'use strict';

  var command = require('../../lib/emulate.js');
  var asyncStub = 'ASYNC';

  describe('emulate', function () {
    it('name', function () {
      expect(command.name).toEqual('emulate');
    });

    it('invoke', function () {
      var mock = jasmine.createSpyObj('mock', ['emulate']);

      var options = {
        platforms: ['ios'],
        build: 'debug',
        device: 'emulator',
        target: 'iPhone'
      };
      command.invoke(mock, options, asyncStub);

      var convertedOptions = {
        platforms: ['ios'],
        options: ['--debug', '--emulator', '--target=iPhone']
      };
      expect(mock.emulate).toHaveBeenCalledWith(convertedOptions, asyncStub);
    });
  });
})();
