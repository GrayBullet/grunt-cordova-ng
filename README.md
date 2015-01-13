# grunt-cordova-ng v0.2.3 [![Build Status](https://travis-ci.org/GrayBullet/grunt-cordova-ng.svg?branch=master)](https://travis-ci.org/GrayBullet/grunt-cordova-ng)
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

| Task                  | Action                                                       |
| --------------------- | ------------------------------------------------------------ |
| cordova:prepare       | Run `cordova prepare` command.                               |
| cordova:compile       | Run `cordova compile` command.                               |
| cordova:build         | Run `cordova build` command.                                 |
| cordova:package-files | Copy apk and app to dist directory.                          |
| cordova:package       | Run `cordova build` command and `cordova:package-files task` |
| cordova:emulate       | Run `cordova emulate` command.                               |
| cordova:run           | Run `cordova run` command.                                   |
| cordova:platform      | Run `cordova platform` command.                              |
| cordova:plugin        | Run `cordova plugin` command.                                |


### Package files Task (Android and iOS only)
_Run this task with the `grunt cordova:package-files` or `grunt cordova:package` command._

Copy *.apk or *.app to `dist` directory, if run `cordova:package-files` or `cordova:package` task.

```
grunt cordova:package
Running "cordova:package" (cordova) task

Running "cordova:build" (cordova) task
...

Running "cordova:package-files" (cordova) task
Copy to dist/android/CordovaApp-debug-unaligned.apk.
Copy to dist/android/CordovaApp-debug.apk.
Copy to dist/ios/emulator/HelloCordova.app.

Done, without errors.
...
```

When iOS device build, ipa file is created.

```
grunt cordova:package --cordova-platforms=ios --cordova-device=device
Running "cordova:package" (cordova) task

Running "cordova:build" (cordova) task
...

Running "cordova:package-files" (cordova) task
Copy to dist/ios/device/HelloCordova.ipa.

Done, without errors.
```


#### Post sign script
If you run `cordova:package` and `cordova:package-files` task, post sign script generated.


##### Android
Generate a private key.

```
keytool -genkey -v -keystore ~/HelloCordova.keystore -alias HelloCordova -keyalg RSA -keysize 2048 -validity 10000
chmod 600 ~/HelloCordova.keystore
```

Create a config file. (./resources/android/config)

```
KEYSTORE=~/HelloCordova.keystore
KEYALIAS=HelloCordova
```

Run `cordova:package` task.

```
grunt cordova:package --cordova-platforms=android --cordova-build=release
```

Run post sign script.

```
./dist/android/distribute
Enter Passphrase for keystore: ******

...

Verification succesful
```

`dist/android/CordovaApp-release.apk` is created.


##### iOS
Modify cordova iOS platform `platforms/ios/cordova/build-release.xcconfig`. Comment `CODE_SIGN_*`.

```
...

//
// XCode Build settings for "Release" Build Configuration.
//

#include "build.xcconfig"

//CODE_SIGN_IDENTITY = iPhone Distribution
//CODE_SIGN_IDENTITY[sdk=iphoneos*] = iPhone Distribution
```

Download distribution provisioning profile from [Member Center Provisioning Profiles](https://developer.apple.com/account/ios/profile/profileList.action?type=production). And copy to `./resources/mobileprovisions/release.mobileprovision`.

```
mkdir -p ./resources/mobileprovisions
cp ~/Download/distribution.mobileprovision ./resources/mobileprovisions/release.mobileprovision
```

Run `cordova:package` task.

```
grunt cordova:package --cordova-platforms=ios --cordova-build=release --cordova-device=device
```

Run post sign script.

```
./dist/ios/distribute

...

Results at '/path/to/project/dist/ios/HelloCordova.ipa'
```

`dist/ios/HelloCordova.ipa` is created.

If you want to use the other provisioning profiles, you can use the "--mobileprovision" argument.

```
cp ~/Download/adhoc.mobileprovision ./resources/mobileprovisions/adhoc.mobileprovision
grunt cordova:package --cordova-platforms=ios --cordova-build=release --cordova-device=device

./dist/ios/distribute --mobileprovision=adhoc
```


### Cordova Platform Task
_Run this task with the `grunt cordova:platform` command._

```
# list cordova platforms.
grunt cordova:platform:list

# add cordova platform.
grunt cordova:platform:add:android

# remove cordova platform.
grunt cordova:platform:remove:android

# update cordova platform.
grunt cordova:platform:update:android

# check cordova platforms.
grunt cordova:platform:check
```

### Cordova Plugin Task
_Run this task with the `grunt cordova:plugin` command._

```
# list installed plugins.
grunt cordova:plugin:list

# search plugins.
grunt cordova:plugin:search:console

# add cordova plugin.
grunt cordova:plugin:add:org.apache.cordova.console

# remove cordova plugin.
grunt cordova:plugin:remove:org.apache.cordova.console
```


### Options


#### projectRoot
Type: `String`
Default: empty

Cordova project root path.


#### platforms
Type: `Array` `String`
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
