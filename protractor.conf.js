// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],  
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  baseUrl: 'https://trade.loginandtrade.com/webtrader/',  
  framework: 'jasmine',  
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,    
    print: function() {}
  },
  onPrepare() {
    browser.waitForAngularEnabled(false);
    require('ts-node').register({
      project: 'tsconfig.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
