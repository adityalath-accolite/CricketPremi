'use strict';

/**
 * @ngdoc overview
 * @name viaGruntApp
 * @description
 * # viaGruntApp
 *
 * Main module of the application.
 */
angular
  .module('viaGruntApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
