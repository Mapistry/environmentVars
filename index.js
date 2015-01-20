var fs = require('fs');
var path = require('path');

var envVars = (typeof process !== 'undefined' && process.env) || {};
var envFileVars = {};

/**
 * Pass in a file path to a .env file, and optionally the name of the file (if you don't use `.env`)
 */
var EnvironmentVars = function(pathToDotEnvFile, fileName) {

  // make `new` optional
  if ( ! (this instanceof EnvironmentVars) ) {
    return new EnvironmentVars(pathToDotEnvFile, fileName);
  }

  this.fileName = fileName || '.env';
  this.filePath = pathToDotEnvFile;
  this._resetCache();

};

/**
 * Pass in the name of an environment variable you'd like to get the value of
 */
EnvironmentVars.prototype.get = function(varName) {
  return envVars[varName] || envFileVars[varName];
};


/**
 * This variable is so common in node apps, that we've just
 * made a wrapper method to retrieve it.
 */
EnvironmentVars.prototype.getAppEnv = function() {
  return this.get('NODE_ENV');
};

/**
 * Mainly used for tests, but refreshes this modules cache of variables
 * that have been read from the .env file
 */
EnvironmentVars.prototype._resetCache = function () {

  try {

    var envFilePath = this._getVarFilePath();
    var fileVars = fs.readFileSync(envFilePath, {encoding: 'utf8'});
    if(!fileVars) {
      throw new Error('Empty .env file');
    }

    fileVars.split("\n").forEach(function(settingsLine) {
      var keyValue = settingsLine.split('=');
      var key = keyValue[0];
      var val = keyValue[1];
      envFileVars[key] = val;
    });

  } catch (e) {}
};

/**
 * Mainly used for testing
 */
EnvironmentVars.prototype._getVarFilePath = function() {
  return path.join(this.filePath, this.fileName);
};

module.exports = EnvironmentVars;