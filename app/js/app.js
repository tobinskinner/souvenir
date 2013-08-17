'use strict';


// Declare app level module which depends on filters, and services
angular.module('souvenirApp', ['souvenirApp.filters', 'souvenirApp.services', 'souvenirApp.directives', 'souvenirApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginToSocialMediaController'});
    $routeProvider.when('/timeline', {templateUrl: 'partials/timeline.html', controller: 'timelineController'});
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
