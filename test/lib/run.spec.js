(function() {
  'use strict';

  var command = require('../../tasks/lib/run.js');
  var asyncStub = 'ASYNC';

  describe('run', function() {
    it('name', function() {
      expect(command.name).toEqual('run');
    });

    it('invoke', function() {
      var mock = jasmine.createSpyObj('mock', [ 'run' ]);

      var options = {
        platforms: [ 'android' ],
        build: 'debug',
        target: 'NEXUS7'
      };
      command.invoke(mock, options, asyncStub);

      var convertedOptions = {
        platforms: [ 'android' ],
        options: [ '--debug', '--target=NEXUS7' ]
      };
      expect(mock.run).toHaveBeenCalledWith(convertedOptions, asyncStub);
    });
  });
})();
