'use strict';
const URL = 'https://covid19.mathdro.id/api';
const CRIC_URL = 'http://cricapi.com/api/matches/fWOeJIGXHcUNEzDuhw0IIF7n5qa2';
/**
 * @ngdoc function
 * @name viaGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the viaGruntApp
 */
angular.module('viaGruntApp')
  .controller('MainCtrl', function ($scope, $http) {  //string interpolation for 2-way data binding
    $scope.login = true;

    $scope.name = ""
    $scope.username = ""
    $scope.password = ""
    $scope.gender = ""
    $scope.dob = ""
    $scope.occ = ""
    $scope.occupations = ["Student","Engineer","Scientist","Doctor","Politician","Actor","Singer","Cricketer","Sportsperson","Carpenter","Architect","Buttler","Cook","Other"];
    
    $scope.isPasswordValid = () => {
      let capital = false;
      let small = false;
      let numeric = false;
      for (var i = 0; i <= $scope.password.length; i++) {
        if ($scope.password.charAt(i).match(/[a-z]/))
          small = true;
        else if ($scope.password.charAt(i).match(/[A-Z]/))
          capital = true;
        else if($scope.password.charAt(i).match(/[0-9]/))
          numeric = true;
      }
      return capital && small && numeric;
    }

    $scope.onSubmit = () => {
      console.log("Form has been submitted");
    }

    $scope.onclick = () => {
      $scope.iter = ($scope.iter == 0 ? 1 : 0);
    }

    let data = 0
    $http.get(URL).then((resp) => {
      console.log('api is',resp);
      data = resp.data;
      console.log("data is ",data)
    }, (err) => {console.log('cant find the api')});
    
    $http.get(CRIC_URL).then((resp) => {
      console.log('cricket is',resp);
      data = resp.data;
      console.log("data is ",data)
    }, (err) => {console.log('cant find the api')});

  });
