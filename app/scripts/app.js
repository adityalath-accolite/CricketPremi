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
        templateUrl: 'views/loginOrSignUp.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomePage',
        controllerAs: 'main'
      })
      .when('/scorecard', {
        templateUrl: 'views/scorecard.html',
        controller: 'ScoreCard',
        controllerAs: 'main'
      })
      .when('/playerprofile', {
        templateUrl: 'views/playerProfile.html',
        controller: 'PlayerProfile',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Data', function(){
    return { MatchId: '' , PlayerId: ''};
  });
