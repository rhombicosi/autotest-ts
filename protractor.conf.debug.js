const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './out-tsc-e2e/**/*.e2e-spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {

  },
  onPrepare: function () {
    browser.waitForAngularEnabled(false);
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
