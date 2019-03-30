// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],// this is where jasmine gets set as a testing framework. If you want to use another framework this is the place to do it.

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],//this is where you set the reporters. You can change them or add new ones.
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,// if this is set to true, the tests run in watch mode. If you change any test and save the file the tests are re-build and re-run.
    browsers: ['Chrome'],//this is where you set the browser where the test should run. By default it is chrome but you can install and use other browser launchers.
    singleRun: false
  });
};
