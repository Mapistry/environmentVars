var fs = require('fs');
var sinon = require('sinon');
var expect = require('expect.js');
var EnvironmentVars = require('../index');

describe('environmentVars', function() {

  it('reads vars from process.env', function() {
    var envVars = new EnvironmentVars();

    var oldValue = process.env.testVar;

    process.env.testVar = 'hello world';
    expect(envVars.get('testVar')).to.be('hello world');

    process.env.testVar = oldValue;
  });

  it('reads NODE_ENV var in getNodeEnv method', function() {
    var envVars = new EnvironmentVars();

    var oldValue = process.env.NODE_ENV;

    process.env.NODE_ENV = 'development';
    expect(envVars.getAppEnv()).to.be('development');

    process.env.NODE_ENV = oldValue;
  });

  describe('when relying on the .env file', function() {
    var filePath, envVars;

    beforeEach(function () {
      envVars = new EnvironmentVars(__dirname);
      filePath = envVars._getVarFilePath();

      // cleanup before each test
      fs.writeFileSync(filePath, 'TEST_ME_OUT=asdf123\n');
      envVars._resetCache();
    });

    afterEach(function () {
      fs.unlinkSync(filePath);
      envVars._resetCache();
    });


    it('properly retrieves variables', function() {
      expect(envVars.get('TEST_ME_OUT')).to.be('asdf123');
    });

  });
});