'use strict';

var debug = require('debug')('swagger-mock-server');
var yaml = require('js-yaml');
var fs = require('fs');

module.exports.doc = function doc(yaml, callback) {
  fs.readFile(yaml, function(err, result) {
    if (err) {
      return callback(err);
    }
    callback(undefined, tryLoadDoc(result));
  });
};


function tryLoadDoc(yamlRaw) {
  try {
    return yaml.safeLoad(yamlRaw);
  } catch (e) {

    debug('Unable to load doc %s', e);
  }

}
