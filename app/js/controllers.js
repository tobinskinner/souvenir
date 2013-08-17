'use strict';

/* Controllers */

angular.module('souvenirApp.controllers', [])
  .controller('souvenirAppController',
    function($scope) {
      // App-wide functions go here
    }
)

.controller('loginToSocialMediaController',
  function($scope) {
    // Login functions go here
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

        window.alert(JSON.stringify(userInfoFacebook) + " " + dates.from + " to " + dates.to);
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

        window.alert(JSON.stringify(userInfoFacebook) + " " + dates.from + " to " + dates.to);
      }
    };

  }
)

.controller('timelineController',
  function($scope) {
    // Timeline functions go here
  }
);