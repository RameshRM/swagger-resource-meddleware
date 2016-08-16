'use strict';

var util = require('util');
var async = require('async');
var modUtils = require('../../mod-utils');
module.exports = SpecRouter;

function SpecRouter(doc, app) {
  this.specDoc = doc;
  this.app = app;
  this.basePath = doc.basePath || '';
  this.app.get(doc.basePath, SpecRouter.all(doc).bind(this));
  this.app.get('/_resources', SpecRouter.all(doc).bind(this));
}


SpecRouter.prototype.route = function route() {
  var self = this;
  return function(routename, callback) {
    var routeDefn = self.specDoc.paths[routename];

    async.map(Object.keys(routeDefn), function(verb, callback) {
      self.bindRoute(routename, verb, callback);
    }, callback);
  };

};

SpecRouter.prototype.bindRoute = function bindRoute(route, verb, callback) {
  var routePath = modUtils.parameterizeRoute(this.basePath ? util.format('%s%s', this.basePath, route) : route);

  this.app[verb](routePath, function route(req, res) {
    res.send(routePath);
  });

  callback(undefined, {
    route: routePath,
    verb: verb
  });
};


SpecRouter.all = function all(doc) {
  return function(req, res) {
    res.send({
      basePath: doc && doc.basePath || '',
      resources: doc && doc.paths || {}
    });
  };
};
