var chai = require('chai');
var expect = chai.expect;
var mocha = require('mocha');
var describe = mocha.describe;
var beforeEach = mocha.beforeEach;
var it = mocha.it;

var EnvVars = require('../dist/lib/environmentVars');

var fileName;
var filePath;

describe('Reading Environment Vars using dotenv', function() {
    beforeEach(function() {
        fileName = '.env.test';
        filePath = 'tests';
    });

    it('Reads vars from process.env', function() {
        var envVars = new EnvVars(filePath, fileName);
        expect(process.env.BASIC).to.equal('basic');
        expect(envVars.getEnvVar('SINGLE_QUOTES')).to.equal('single_quotes');
    });

    it('Reads NODE_ENV var in getNodeEnv method', function() {
        var envVars = new EnvVars(filePath, fileName);
        expect(envVars.getAppEnv()).to.equal('test');
        expect(process.env.NODE_ENV).to.equal('test');
    });
});