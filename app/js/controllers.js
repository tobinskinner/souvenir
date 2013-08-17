'use strict';

/* Controllers */

angular.module('souvenirApp.controllers', [])
  .controller('souvenirAppController',
    function($scope) {
      // App-wide functions go here
    }
)

.controller('loginToSocialMediaController',
  function($scope, $rootScope, Media) {
    // Login functions go here

    // Set up scope variables
    $scope.datesEntered = false;
    $scope.loggedInToFlickr = false;
    $scope.loggedInToTwitter = false;
    $scope.loading = false;

    $rootScope.media = {};

    $scope.setDates = function(dates) {
      if (!dates || !dates.from || !dates.to) {
        window.alert("Please enter your travel dates.");
      } else {
        // Annoying workaround because javascript dates are awful
        var dateFromArray = dates.from.split("-");
        var dateToArray = dates.to.split("-");
        var dateFromYear = dateFromArray[0];
        var dateFromMonth = dateFromArray[1];
        var dateFromDay = dateFromArray[2];
        var dateToYear = dateToArray[0];
        var dateToMonth = dateToArray[1];
        var dateToDay = dateToArray[2];

        var dateFrom = new Date(dateFromYear, (dateFromMonth - 1), dateFromDay);
        var dateTo = new Date(dateToYear, (dateToMonth - 1), dateToDay);

        console.log(dateFrom);
        console.log(dateTo);

        if (dateFrom > dateTo) {
          window.alert("Please verify dates.\nYour departure date is later than your returning date.");
          return;
        }

        $scope.fromDate = dates.from;
        $scope.toDate = dates.to;

        do {
          $rootScope.media[dateFrom.toLocaleDateString()] = {};
          $rootScope.media[dateFrom.toLocaleDateString()].date = dateFrom.toDateString();
          $rootScope.media[dateFrom.toLocaleDateString()].flickr = [];
          $rootScope.media[dateFrom.toLocaleDateString()].twitter = [];

          dateFrom.setTime(dateFrom.getTime() + 1 * 86400000);
        }
        while (dateFrom.getTime() <= dateTo.getTime());
        $scope.datesEntered = true;
      }

      console.log($rootScope.media);
    };

    $scope.getFlickr = function(userInfoFlickr, dates) {
      if (!userInfoFlickr || !userInfoFlickr.username) {
        window.alert("Please enter a username for Flickr.");
        return;
      } else {
        $scope.loading = true;
        var dateFrom = new Date(dates.from);
        var dateTo = new Date(dates.to);

        // TODO Change to REST API request
        // Add Flickr images to scope if they fall in date range
        Media.fakeFlickrData(userInfoFlickr.username, dateFrom, dateTo).then(function(flickrResponse) {
          for (var i = 0; i < flickrResponse.length; i++) {
            var url = "http://farm" + flickrResponse[i].farm + ".staticflickr.com/" + flickrResponse[i].server + "/" + flickrResponse[i].id + "_" + flickrResponse[i].secret + ".jpg";
            var postedDate = new Date(flickrResponse[i].datetaken).toLocaleDateString();
            console.log(flickrResponse[i].datetaken);
            console.log(postedDate);
            if ($rootScope.media[postedDate]) {
              var newFlickrObject = {};
              if (flickrResponse[i].location) {
                newFlickrObject.location = flickrResponse[i].location;
              }
              if (flickrResponse[i].title) {
                newFlickrObject.title = flickrResponse[i].title;
              }
              newFlickrObject.imageURL = url;
              $rootScope.media[postedDate].flickr.push(newFlickrObject);
            }
          }
          console.log($rootScope.media);


          $scope.loading = false;
          $scope.loggedInToFlickr = true;
        });
      }
    };

    $scope.getTwitter = function(userInfoTwitter, dates) {
      if (!userInfoTwitter || !userInfoTwitter.username || !userInfoTwitter.password) {
        window.alert("Please enter both a username and a password for Twitter.");
        return;
      } else {
        $scope.loading = true;
        var dateFrom = new Date(dates.from);
        var dateTo = new Date(dates.to);

        // TODO Change to REST API request
        // Add tweets to scope if they fall in date range
        Media.fakeTwitterData().then(function(twitterResponse) {
          for (var i = 0; i < twitterResponse.length; i++) {
            var postedDate = new Date(twitterResponse[i].date * 1000).toLocaleDateString();
            if ($scope.media[postedDate]) {
              $rootScope.media[postedDate].twitter.push(twitterResponse[i]);
            }
          }
          $scope.loading = false;
          $scope.loggedInToTwitter = true;
        });
      }
    };

    $scope.generateTimeline = function() {
      // Add some error checking
      if ($rootScope.media == undefined) {
        window.alert("There is no data to show. Please verify dates and log-ins.");
        return;
      }
      window.location.assign("#/timeline");
    };

  }
)

.controller('timelineController',
  function($scope, $rootScope) {
    // Timeline functions go here
  }
);