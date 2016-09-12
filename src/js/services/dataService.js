/**
 * Service which handles HTTP requests
 */
'use strict';

module.exports = ['$http', function ($http) {
  return {
    get: function(url) {
      return $http.get(url);
    }
  };
}];
