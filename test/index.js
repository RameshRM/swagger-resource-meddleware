'use strict';

var resourceServer = require('../');
var supertest = require('supertest');
var app = require('express')();
var yamlLoader = require('./modUtils/js-to-yaml');
var async = require('async');
var path = require('path');
var assert = require('assert');

describe('Should mount resource', function() {
  before(function(done) {

    async.waterfall([
      yamlLoader.doc.bind(this, path.join(__dirname, '/fixtures/petstore.yaml')),
      function(result, callback) {
        resourceServer.mount({
          name: 'petstore',
          doc: result
        }, app, callback);
      }
    ], function(err, result) {
      assert.ok(!err);
      assert.ok(result);
      done();
    });
  });

  it('should get /_resources', function(done) {
    supertest(app).get('/_resources').end(function(err, response) {
      assert.ok(!err && response.body);
      assert.ok(response.body.resources && response.body.resources['/pets']);
      done();
    });

  });

  it('should get /basepath /v1', function(done) {
    supertest(app).get('/v1').end(function(err, response) {
      assert.ok(!err && response.body);
      assert.ok(response.body.resources && response.body.resources['/pets']);
      done();
    });
  });

  it('should get /pets /v1/pets', function(done) {
    supertest(app).get('/v1/pets').end(function(err, response) {
      assert.ok(!err && response.text);
      done();
    });
  });

});
