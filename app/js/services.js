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
        'fakeFlickrData': function(username, dateFrom, dateTo) {
          // http://localhost:9999/flickr?user=jdhorner&sy=2009&sm=8&sd=22&ey=2009&em=8&ed=24
          var server = "http://www.jopho.com/flickr?";
          var stringDateFrom = "sy=" + dateFrom.getFullYear() + "&sm=" + (dateFrom.getMonth() + 1) + "&sd=" + dateFrom.getDate();
          var stringDateTo = "ey=" + dateTo.getFullYear() + "&em=" + (dateTo.getMonth() + 1) + "&ed=" + dateTo.getDate();
          var url = server + "user=" + username + "&" + stringDateFrom + "&" + stringDateTo;

          console.log(url);
          var promise = $http.get(url)
            .then(function(response) {
              return response.data.photos.photo;
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