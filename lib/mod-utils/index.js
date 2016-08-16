'use strict';

module.exports.parameterizeRoute = function(route) {
  return route && route.replace(/{/g, ':').replace(/}/g, '') || route;
};
