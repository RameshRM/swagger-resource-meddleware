'use strict';

var assert = require('assert');
var meddleware = require('./meddleware').meddleware;

module.exports.mount = function(options, app, callback) {
  assert.ok(options.doc, 'Spec Document is required.');
  assert.ok(callback, 'Callback is required.');

  return meddleware(options, app, callback);
};
