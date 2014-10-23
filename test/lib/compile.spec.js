(function () {
  'use strict';

  var command = require('../../lib/compile.js');
  var asyncStub = 'ASYNC';

  describe('compile', function () {
    it('name', function () {
      expect(command.name).toEqual('compile');
    });

    it('invoke', function () {
      var mock = jasmine.createSpyObj('mock', ['compile']);

      var options = {
        platforms: ['ios'],
        build: 'release',
        device: 'emulator'
      };
      command.invoke(mock, options, asyncStub);

      var convertedOptions = {
        platforms: ['ios'],
        options: ['--release', '--emulator']
      };

      expect(mock.compile).toHaveBeenCalledWith(convertedOptions, asyncStub);
    });
  });
})();
