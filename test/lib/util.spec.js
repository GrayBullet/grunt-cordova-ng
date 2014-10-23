(function() {
  'use strict';

  // Clean environment variables.
  delete process.env.GRUNT_CORDOVA_NG_PLATFORMS;
  delete process.env.GRUNT_CORDOVA_NG_BUILD;
  delete process.env.GRUNT_CORDOVA_NG_DEVICE;
  delete process.env.GRUNT_CORDOVA_NG_TARGET;

  var util = require('../../lib/util.js');

  describe('util', function() {
    var grunt = {
      options: {},
      option: function(name) {
        return this.options[name];
      },
      initialize: function() {
        this.options = {};
      }
    };

    beforeEach(function() {
      grunt.initialize();
    });

    describe('convertCordovaOptions', function() {
      it('Empty options.', function() {
        var result = util.convertCordovaOptions({});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      ['debug', 'release'].forEach(function(build) {
        it('Build type is "' + build + '".', function() {
          var result = util.convertCordovaOptions({build: build});

          expect(result).toEqual({
            platforms: [],
            options: ['--' + build]
          });
        });
      });

      it('Build type is empty.', function() {
        var result = util.convertCordovaOptions({build: ''});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Build type is null.', function() {
        var result = util.convertCordovaOptions({build: null});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Build type is undefined.', function() {
        var result = util.convertCordovaOptions({build: undefined});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      ['device', 'emulator'].forEach(function(device) {
        it('Device type is "' + device + '".', function() {
          var result = util.convertCordovaOptions({device: device});

          expect(result).toEqual({
            platforms: [],
            options: ['--' + device]
          });
        });
      });

      it('Device type is empty.', function() {
        var result = util.convertCordovaOptions({device: ''});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Device type is null.', function() {
        var result = util.convertCordovaOptions({device: null});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Device type is undefined.', function() {
        var result = util.convertCordovaOptions({device: undefined});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Target is "AVD1".', function() {
        var result = util.convertCordovaOptions({target: 'AVD1'});

        expect(result).toEqual({
          platforms: [],
          options: ['--target=AVD1']
        });
      });

      it('Target is empty.', function() {
        var result = util.convertCordovaOptions({target: ''});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Target is null.', function() {
        var result = util.convertCordovaOptions({target: null});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Target is undefined.', function() {
        var result = util.convertCordovaOptions({target: undefined});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Platform is "android".', function() {
        var result = util.convertCordovaOptions({platforms: 'android'});

        expect(result).toEqual({
          platforms: ['android'],
          options: []
        });
      });

      it('Platform is ["android"].', function() {
        var result = util.convertCordovaOptions({platforms: ['android']});

        expect(result).toEqual({
          platforms: ['android'],
          options: []
        });
      });

      it('Platform is ["android", "ios"].', function() {
        var platforms = ['android', 'ios'];
        var result = util.convertCordovaOptions({platforms: platforms});

        expect(result).toEqual({
          platforms: ['android', 'ios'],
          options: []
        });
      });

      it('Platform is empty.', function() {
        var result = util.convertCordovaOptions({platforms: []});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Platforms is null.', function() {
        var result = util.convertCordovaOptions({platforms: null});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Platforms is undefined.', function() {
        var result = util.convertCordovaOptions({platforms: undefined});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Multiple options.', function() {
        var options = {
          platforms: 'ios',
          build: 'release',
          device: 'emulator',
          target: 'iPhone'
        };
        var result = util.convertCordovaOptions(options);

        expect(result).toEqual({
          platforms: ['ios'],
          options: [
            '--release',
            '--emulator',
            '--target=iPhone'
          ]
        });
      });
    });

    describe('mergeOptions', function() {
      it('Use default user options.', function() {
        var result = util.mergeOptions({build: 'default'}, undefined);

        expect(result.build).toEqual('default');
      });

      it('Use override debug options.', function() {
        var result = util.mergeOptions({build: 'default'}, 'debug');

        expect(result.build).toEqual('debug');
      });

      it('Use custom user options by build type.', function() {
        var options = {
          debugOptions: {
            build: 'custom',
          }
        };
        var result = util.mergeOptions(options, 'debug');

        expect(result.build).toEqual('custom');
      });

      it('Override debug options.', function() {
        var result = util.mergeOptions({}, 'debug');

        expect(result).toEqual({build: 'debug', device: 'emulator'});
      });

      it('Override release options.', function() {
        var result = util.mergeOptions({}, 'release');

        expect(result).toEqual({build: 'release', device: 'device'});
      });

      it('Environment options.', function() {
        var result = util.mergeOptions({}, 'release', grunt, {
          GRUNT_CORDOVA_NG_PLATFORMS: 'ios'
        });

        expect(result).toEqual({
          platforms: ['ios'],
          build: 'release',
          device: 'device'
        });
      });

      it('Grunt argument options.', function() {
        grunt.options = {
          'cordova-build': 'build:grunt',
          'cordova-device': 'device:grunt'
        };
        var result = util.mergeOptions({}, 'debug', grunt, {
          GRUNT_CORDOVA_NG_BUILD: 'build:environment',
          GRUNT_CORDOVA_NG_TARGET: 'target:environment'
        });

        expect(result).toEqual({
          build: 'build:grunt',
          device: 'device:grunt',
          target: 'target:environment'
        });
      });

      it('Mix options.', function() {
        var options = {
          build: 'default build',
          option1: 'default option1',
          option2: 'default option2',
          debugOptions: {
            device: 'debug device',
            option2: 'debug option2'
          }
        };
        var result = util.mergeOptions(options, 'debug');
        delete result.debugOptions;

        expect(result).toEqual({
          build: 'debug',
          device: 'debug device',
          option1: 'default option1',
          option2: 'debug option2'
        });
      });
    });

    describe('getEnvironmentOptions', function() {
      it('No environment options.', function() {
        var result = util.getEnvironmentOptions({});

        expect(result).toEqual({});
      });

      it('Get single platform.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_PLATFORMS: 'ios'
        });

        expect(result).toEqual({platforms: ['ios']});
      });

      it('Get multiple platforms.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_PLATFORMS: 'ios,android'
        });

        expect(result).toEqual({platforms: ['ios', 'android']});
      });

      it('Get multiple platforms include whitespace.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_PLATFORMS: 'ios, android'
        });

        expect(result).toEqual({platforms: ['ios', 'android']});
      });

      it('Platforms is empty.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_PLATFORMS: ''
        });

        expect(result).toEqual({platforms: []});
      });

      it('Get build type.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_BUILD: 'build1'
        });

        expect(result).toEqual({build: 'build1'});
      });

      it('build type is empty.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_BUILD: ''
        });

        expect(result).toEqual({build: ''});
      });

      it('Get device type.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_DEVICE: 'device1'
        });

        expect(result).toEqual({device: 'device1'});
      });

      it('Device type is empty.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_DEVICE: ''
        });

        expect(result).toEqual({device: ''});
      });

      it('Get target.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_TARGET: 'target1'
        });

        expect(result).toEqual({target: 'target1'});
      });

      it('Target is empty.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_TARGET: ''
        });

        expect(result).toEqual({target: ''});
      });

      it('All settings.', function() {
        var result = util.getEnvironmentOptions({
          GRUNT_CORDOVA_NG_PLATFORMS: 'ios, android',
          GRUNT_CORDOVA_NG_BUILD: 'debug',
          GRUNT_CORDOVA_NG_DEVICE: 'emulator',
          GRUNT_CORDOVA_NG_TARGET: 'target1'
        });

        expect(result).toEqual({
          platforms: ['ios', 'android'],
          build: 'debug',
          device: 'emulator',
          target: 'target1'
        });
      });
    });

    describe('getGruntArgumentsOptions', function() {
      it('No argument options.', function() {
        grunt.options = {};
        var result = util.getGruntArgumentsOptions(grunt);

        expect(result).toEqual({});
      });

      it('Get platforms.', function() {
        grunt.options = {'cordova-platforms': 'android, ios, firefoxos'};
        var result = util.getGruntArgumentsOptions(grunt);

        expect(result).toEqual({
          platforms: ['android', 'ios', 'firefoxos']
        });
      });

      it('Get build type.', function() {
        grunt.options = {'cordova-build': 'build 2'};
        var result = util.getGruntArgumentsOptions(grunt);

        expect(result).toEqual({build: 'build 2'});
      });

      it('Get device type.', function() {
        grunt.options = {'cordova-device': 'device a'};
        var result = util.getGruntArgumentsOptions(grunt);

        expect(result).toEqual({device: 'device a'});
      });

      it('Get target.', function() {
        grunt.options = {'cordova-target': 'iPad (Retina)'};
        var result = util.getGruntArgumentsOptions(grunt);

        expect(result).toEqual({target: 'iPad (Retina)'});
      });
    });
  });
})();
