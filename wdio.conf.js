require('ts-node/register');
require('dotenv').config();

exports.config = require('./config').config;
exports.config = {

  reporters: [['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true,
}]],
    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually obsolete as
    // WebdriverIO automatically connects to localhost. Also if you are using one of the
    // supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
    // need to define host and port information because WebdriverIO can figure that our
    // according to your user and key information. However if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    //
    // host: 'localhost',
    // port: 8000,
    // path: './test/server/selenium-server-standalone-2.46.0.jar --hub',
    //
    // =================
    // Service Providers
    // =================
    // WebdriverIO supports Sauce Labs, Browserstack and Testing Bot (other cloud providers
    // should work too though). These services define specific user and key (or access key)
    // values you need to put in here in order to connect to these services.
    //
    // user: 'webdriverio',
    // key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',
    //
    // If you are using Sauce Labs WebdriverIO takes care about updating the job information
    // once the test is done. This option is set to `true` per default.
    //
    // updateJob: true,
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
      'test/ui/tests-unit/**/*.js',
    ],
    // Patterns to exclude.
    // exclude: [
    //     'test/spec/multibrowser/**',
    //     'test/spec/mobile/**'
    // ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilties at the same
    // time. Depending on the number of capabilities WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude option in
    // order to group specific specs to a specific capability.
    //
    // If you have trouble getting all important capabilities together check out Sauce Labs
    // platform configurator. A great tool to configure your capabilities.
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
      browserName: 'firefox'
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity.
    logLevel: 'silent',
    //
    // Enables colors for log output
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './test/ui/failedTests/',
    //
    // Shorten url command calls by setting a base url. If your url parameter starts with "/"
    // the base url gets prepended.
    baseUrl: 'http://localhost:3000',
    //
    // Default timeout for all waitForXXX commands.
    waitforTimeout: 10000,
    //
    // Initialise the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as property. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //   webdrivercss: {
    //       screenshotRoot: './test/ui/tests-diff/baseline/',
    //       failedComparisonsRoot: './test/ui/tests-diff/fails/',
    //       misMatchTolerance: 0.05,
    //       updateBaseline: false,
    //   }
    // },
    //
    // Framework you want to run your specs with.
    // The following are supported: mocha, jasmine and cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the node package for the specific framework installed before running
    // any tests. If not please install the following package:
    // Mocha: `$ npm install mocha`
    // Jasmine: `$ npm install jasmine`
    // Cucumber: `$ npm install cucumber`
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The following are supported: dot (default), spec and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    reporter: 'spec',
    //
    // Some reporter require additional information which should get defined here
    reporterOptions: {
      //
      // If you are using the "xunit" reporter you should define the directory where
      // WebdriverIO should save all unit reports.
      outputDir: './reports/'
    },
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
      ui: 'bdd'
    },
    //
    // Options to be passed to Jasmine.
    // jasmineNodeOpts: {
    //     //
    //     // Jasmine default timeout
    //     defaultTimeoutInterval: 5000,
    //     //
    //     // The Jasmine framework allows it to intercept each assertion in order to log the state of the application
    //     // or website depending on the result. For example it is pretty handy to take a screenshot everytime
    //     // an assertion fails.
    //     expectationResultHandler: function(passed, assertion) {
    //         // do something
    //     },
    //     //
    //     // Make use of jasmine specific grep functionality
    //     grep: null,
    //     invertGrep: null
    // },
    //
    // If you are using Cucumber you need to specify where your step definitions are located.
    // cucumberOpts: {
    //     require: ['./examples/runner-specs/cucumber/step-definitions.js'],
    //     // Enable this config to treat undefined definitions as warnings.
    //     ignoreUndefinedDefinitions: false,
    //     // run only certain scenarios annotated by tags
    //     tags: ['foo', 'bar']
    // },
    //
    // =====
    // Hooks
    // =====
    // Run functions before or after the test. If one of them return with a promise, WebdriverIO
    // will wait until that promise got resolved to continue.
    // see also: http://webdriver.io/guide/testrunner/hooks.html
    //
    // Gets executed before all workers get launched.
    onPrepare: function() {
      console.log('opening browser...')
    },
    //
    // Gets executed before test execution begins. At this point you will have access to all global
    // variables like `browser`. It is the perfect place to define custom commands.
    before: function() {
      browser.on( 'error', function (err) {
        return browser.close()
      } )

      // set up 'globals' for testing
      // save us some typing
      var chai = require('chai')
      var chaiAsPromised = require('chai-as-promised')

      chai.use(chaiAsPromised)
      assert = chai.assert
      chai.Should()
    },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    after: function() {
      browser.close()
    },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    onComplete: function() {
      // browser.close()
    }




};