# grunt-cordova-ng v0.1.0
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


## Using Example

### Release build
In this example, running `cordova build android --release`.

```
// Project configuration.
grunt.initConfig({
  options: {
    platforms: 'android',
    build: release
  }
});
```

And run.

```
grunt cordova:build
```
