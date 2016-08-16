'use strict';

var async = require('async');
var specRouter = require('./spec-router');

module.exports.meddleware = function(options, app, callback) {
  var SpecRouter = new specRouter(options.doc, app);
  var allPaths = (options.doc || {}).paths;
  async.map(Object.keys(allPaths), SpecRouter.route().bind(this), function(err, results) {
    callback(err, results);
  });
};
