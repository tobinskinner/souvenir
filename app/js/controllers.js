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
    $scope.loggedInToFacebook = false;
    $scope.loggedInToTwitter = false;

    $scope.getFacebook = function(userInfoFacebook, dates) {
      if (!dates || !dates.from || !dates.to) {
        window.alert("Please enter your travel dates.");
      } else if (!userInfoFacebook || !userInfoFacebook.username || !userInfoFacebook.password) {
        window.alert("Please enter both a username and a password for Facebook.");
        return;
      } else {
        var dateFrom = new Date(dates.from);
        var dateTo = new Date(dates.to);
        if (dateFrom > dateTo) {
          window.alert("Please verify dates.\nYour departure date is later than your returning date.");
          return;
        }
        // TODO Change to REST API request
        Media.blankDataTemplate().then(function(facebookResponse) {
            $rootScope.media = facebookResponse;
            $scope.loggedInToFacebook = true;
          });

        console.log(JSON.stringify(userInfoFacebook) + " " + dates.from + " to " + dates.to);
      }
    };

    $scope.getTwitter = function(userInfoFacebook, dates) {
      if (!dates || !dates.from || !dates.to) {
        window.alert("Please enter your travel dates.");
      } else if (!userInfoFacebook || !userInfoFacebook.username || !userInfoFacebook.password) {
        window.alert("Please enter both a username and a password for Twitter.");
        return;
      } else {
        var dateFrom = new Date(dates.from);
        var dateTo = new Date(dates.to);
        if (dateFrom > dateTo) {
          window.alert("Please verify dates.\nYour departure date is later than your returning date.");
          return;
        }
        // TODO Change to REST API request
        Media.blankDataTemplate().then(function(tweetResponse) {
            $rootScope.media = tweetResponse;
            $scope.loggedInToTwitter = true;
          });
          console.log(JSON.stringify(userInfoFacebook) + " " + dates.from + " to " + dates.to);
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