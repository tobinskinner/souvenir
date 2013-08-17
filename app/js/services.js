'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('souvenirApp.services', [])
  .value('version', '0.1')
  .factory(
    'Media',
    function($http) {
      return {
        'fakeFlickrData': function() {
          var promise = $http.get('templates/date_template_FAKE_DATA_FLICKR.json')
            .then(function(response) {
              return response.data;
            });
          return promise;
        },
        'fakeTwitterData': function() {
          var promise = $http.get('templates/date_template_FAKE_DATA_TWITTER.json')
            .then(function(response) {
              return response.data;
            });
          return promise;
        }
      };
    });