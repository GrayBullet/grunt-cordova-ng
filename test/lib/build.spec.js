(function () {
  'use strict';

  var command = require('../../lib/build.js');
  var asyncStub = 'ASYNC';

  describe('build', function () {
    it('name', function () {
      expect(command.name).toEqual('build');
    });

    it('invoke', function () {
      var mock = jasmine.createSpyObj('mock', ['build']);

      var options = {
        platforms: ['ios', 'android'],
        build: 'release',
        device: 'device'
      };
      command.invoke(mock, options, asyncStub);

      var convertedOptions = {
        platforms: ['ios', 'android'],
        options: ['--release', '--device']
      };
      expect(mock.build).toHaveBeenCalledWith(convertedOptions, asyncStub);
    });
  });
})();
