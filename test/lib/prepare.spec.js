(function () {
  'use strict';

  var command = require('../../lib/prepare.js');
  var asyncStub = 'ASYNC';

  describe('prepare', function () {
    it('name', function () {
      expect(command.name).toEqual('prepare');
    });

    it('invoke', function () {
      var mock = jasmine.createSpyObj('mock', ['prepare']);

      var options = {
        platforms: ['ios'],
        build: 'release',
        device: 'emulator'
      };
      command.invoke(mock, undefined, options, asyncStub);

      var convertedOptions = {
        platforms: ['ios'],
        options: ['--release', '--emulator']
      };

      expect(mock.prepare).toHaveBeenCalledWith(convertedOptions, asyncStub);
    });
  });
})();
