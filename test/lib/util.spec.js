(function() {
  'use strict';

  var util = require('../../lib/util.js');

  describe('util', function() {
    describe('convertCordovaOptions', function() {
      it('Empty options.', function() {
        var result = util.convertCordovaOptions({});

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      [ 'debug', 'release' ].forEach(function(build) {
        it('Build type is "' + build + '".', function() {
          var result = util.convertCordovaOptions({ build: build });

          expect(result).toEqual({
            platforms: [],
            options: [ '--' + build ]
          });
        });
      });

      it('Build type is empty.', function() {
        var result = util.convertCordovaOptions({ build: '' });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Build type is null.', function() {
        var result = util.convertCordovaOptions({ build: null });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Build type is undefined.', function() {
        var result = util.convertCordovaOptions({ build: undefined });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      [ 'device', 'emulator' ].forEach(function(device) {
        it('Device type is "' + device + '".', function() {
          var result = util.convertCordovaOptions({ device: device });

          expect(result).toEqual({
            platforms: [],
            options: [ '--' + device ]
          });
        });
      });

      it('Device type is empty.', function() {
        var result = util.convertCordovaOptions({ device: '' });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Device type is null.', function() {
        var result = util.convertCordovaOptions({ device: null });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Device type is undefined.', function() {
        var result = util.convertCordovaOptions({ device: undefined });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Target is "AVD1".', function() {
        var result = util.convertCordovaOptions({ target: 'AVD1' });

        expect(result).toEqual({
          platforms: [],
          options: [ '--target=AVD1' ]
        });
      });

      it('Target is empty.', function() {
        var result = util.convertCordovaOptions({ target: '' });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Target is null.', function() {
        var result = util.convertCordovaOptions({ target: null });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Target is undefined.', function() {
        var result = util.convertCordovaOptions({ target: undefined });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Platform is "android".', function() {
        var result = util.convertCordovaOptions({ platforms: 'android' });

        expect(result).toEqual({
          platforms: [ 'android' ],
          options: []
        });
      });

      it('Platform is [ "android" ].', function() {
        var result = util.convertCordovaOptions({ platforms: [ 'android' ]});

        expect(result).toEqual({
          platforms: [ 'android' ],
          options: []
        });
      });

      it('Platform is [ "android", "ios" ].', function() {
        var platforms = [ 'android', 'ios' ];
        var result = util.convertCordovaOptions({ platforms: platforms });

        expect(result).toEqual({
          platforms: [ 'android', 'ios' ],
          options: []
        });
      });

      it('Platform is empty.', function() {
        var result = util.convertCordovaOptions({ platforms: [] });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Platforms is null.', function() {
        var result = util.convertCordovaOptions({ platforms: null });

        expect(result).toEqual({
          platforms: [],
          options: []
        });
      });

      it('Platforms is undefined.', function() {
        var result = util.convertCordovaOptions({ platforms: undefined });

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
          platforms: [ 'ios' ],
          options: [
            '--release',
            '--emulator',
            '--target=iPhone'
          ]
        });
      });
    });
  });
})();
