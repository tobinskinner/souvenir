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
        var dateFrom = new Date(dates.from);
        var dateTo = new Date(dates.to);

        if (dateFrom > dateTo) {
          window.alert("Please verify dates.\nYour departure date is later than your returning date.");
          return;
        }

        var fromDateToString = JSON.stringify(dates.from);
        console.log(fromDateToString);
        var currentDate = new Date(fromDateToString);
        var finalDate = new Date(dates.to);
        do {
          $rootScope.media[currentDate.toLocaleDateString()] = {};
          $rootScope.media[currentDate.toLocaleDateString()].date = currentDate.toDateString();
          $rootScope.media[currentDate.toLocaleDateString()].flickr = [];
          $rootScope.media[currentDate.toLocaleDateString()].twitter = [];

          currentDate.setDate(currentDate.getDate() + 1);
        }
        while (currentDate.getDate() <= (finalDate.getDate() + 1));
        $scope.datesEntered = true;
      }
    };

    $scope.getFlickr = function(userInfoFlickr, dates) {
      if (!userInfoFlickr || !userInfoFlickr.username || !userInfoFlickr.password) {
        window.alert("Please enter both a username and a password for Flickr.");
        return;
      } else {
        $scope.loading = true;
        var dateFrom = new Date(dates.from);
        var dateTo = new Date(dates.to);

        // TODO Change to REST API request
        // Add Flickr images to scope if they fall in date range
        Media.fakeFlickrData().then(function(flickrResponse) {
          for (var i = 0; i < flickrResponse.length; i++) {
            var postedDate = new Date(flickrResponse[i].date * 1000).toLocaleDateString();
            if ($scope.media[postedDate]) {
              $rootScope.media[postedDate].flickr.push(flickrResponse[i]);
            }
          }

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