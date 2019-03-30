// This file is required by karma.conf.js and loads recursively all the .spec and framework files
//An environment to run angular tests is being created using all the imports at the beginning of the file.
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
//TestBed is a powerful unit testing tool provided by angular, and it is initialized in this file.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);//Finally, karma loads all the tests files of the application matching their names against a regular expression. All files inside our app folder that has “spec.ts” on its name are considered a test.
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
