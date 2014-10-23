# grunt-cordova-ng v0.1.1
[Apache Cordova](http://cordova.apache.org/) grunt plugin.


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cordova-ng --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cordova-ng');
```


## Cordova Task
_Run this task with the `grunt cordova` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

| Task            | Action                         |
| --------------- | ------------------------------ |
| cordova:build   | Run `cordova build` command.   |
| cordova:emulate | Run `cordova emulate` command. |
| cordova:run     | Run `cordova run` command.     |


### Options


#### platforms
Type: `Array` 'String'
Default: empty array

Building with cordova platforms.


#### build
Type: `debug` `release`
Default: empty string

Bulding type. Use `--debug` or `--release` cordova option.


#### device
Type: `device` `emulator`
Default: empty string

Device type. Use `--device` or `--emulator` cordova option.


#### target
Type: 'String'
Default: empty string

Run or emulate target id. Use `--target=` cordova option.


#### debugOptions
Type: 'Object'
Default: not defined

Debug build's options.


#### releaseOptions
Type: 'Object'
Default: not defined

Release build's options.


### Environment options
It is possible to override the set in the environment variables.

```
# cordova emulate ios --target=iPad
export GRUNT_CORDOVA_NG_PLATFORMS=ios
export GRUNT_CORDOVA_NG_TARGET=iPad
grunt cordova:emulate
```

| Environment Name           | Value                                     |
| -------------------------- | ----------------------------------------- |
| GRUNT_CORDOVA_NG_PLATFORMS | `ios,android` (Comma separated platforms) |
| GRUNT_CORDOVA_NG_BUILD     | `debug` or `releaase`                     |
| GRUNT_CORDOVA_NG_DEVICE    | `device` or `emulator`                    |
| GRUNT_CORDOVA_NG_TARGET    | `iPad` (Cordova Target)                   |


### Grunt arguments
It is possible to override the set in the grunt arguments.

```
# cordova emulate android --target=avd1
grunt cordova:emulate --cordova-platforms=android --cordova-target=avd1
```

| Environment Name    | Value                                     |
| ------------------- | ----------------------------------------- |
| --cordova-platforms | `ios,android` (Comma separated platforms) |
| --cordova-build     | `debug` or `releaase`                     |
| --cordova-device    | `device` or `emulator`                    |
| --cordova-target    | `iPad` (Cordova Target)                   |


## Using Example


### Build options
In this example, running `cordova build android --release`.

```
// Project configuration.
grunt.initConfig({
  cordova: {
    options: {
      platforms: 'android',
        build: 'release'
    }
  }
});
```

And run.

```
grunt cordova:build
```


### Release or debug build
To the release build. (Run `cordova build --release --device`.)

```
grunt cordova:build:release
```

To the debug build. (Run `cordova build --debug --emulator`.)

```
grunt cordova:build:debug
```

Can use in any other command.

```
grunt cordova:emulate:debug
```

To change release or debug build options.

```javascript
// Project configuration.
grunt.initConfig({
  cordova: {
    options: {
      releaseOptions: {
        build: 'release',
        device: 'device'
      },
      debugOptions: {
        build: 'debug',
        device: 'emulator'
      }
    }
  }
});
```
