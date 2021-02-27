'use strict';

const KEY = '58sYxn59vnTFZgFdatNq9ciyytm2';  //fWOeJIGXHcUNEzDuhw0IIF7n5qa2  //4jUt8b9e8xMvcEyPQJkNh8nPaTw1  //qN5lGSliJEWyEQR645HO7saiS6S2 //58sYxn59vnTFZgFdatNq9ciyytm2
const CRIC_URL = 'http://cricapi.com/api/matches/' + KEY;
const SCORES = 'https://cricapi.com/api/cricketScore/' + KEY;
const SCORECARD = 'https://cricapi.com/api/fantasySummary/' + KEY;

/**
 * @ngdoc function
 * @name viaGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the viaGruntApp
 */
angular.module('viaGruntApp')
  .controller('MainCtrl', function ($scope, $location) {
    
    $scope.login = true;
    $scope.users = localStorage.getItem('array')==null?[]:JSON.parse(localStorage.getItem('array'));
    
    $scope.loggedIn = true;
    $scope.loginUsername = '';
    $scope.loginPassword = '';
    
    $scope.name = "";
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";
    $scope.gender = "prefer not to say";
    $scope.dob = new Date();
    $scope.occ = "Engineer";
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

    $scope.isEmailAlreadyUsed = () => {
      let bool = false;
      angular.forEach($scope.users,(user) => {
        if($scope.email==user.email)
        {
          bool = true;
        }
      })
      return bool;
    }

    $scope.isUsernameAlreadyUsed = () => {
      let bool = false;
      angular.forEach($scope.users,(user) => {
        if($scope.username==user.username)
        {
          bool = true;
        }
      })
      return bool;
    }

    $scope.onSubmit = () => {
      $scope.users.push({
        name: $scope.name,
        username: $scope.username,
        email: $scope.email,
        password: $scope.password,
        gender: $scope.gender,
        dob: $scope.dob,
        occ: $scope.occ
      })
      localStorage.setItem('array',JSON.stringify($scope.users)); 
      $location.path("/nowhere");
    }

    $scope.onLogin = () => {
      $scope.loggedIn = false;
      angular.forEach($scope.users,(user) => {
        if($scope.loginUsername==user.username && $scope.loginPassword==user.password)
        {
          $scope.loggedIn = true;
          $location.path("/home");
        }
      })
    }
    
  })
  .controller('HomePage', function($scope, Data, $interval, $http, $location){
    let matches;
    $scope.ongoingMatches = [];
    $http.get(CRIC_URL).then((resp) => {
      matches = resp.data.matches;
      angular.forEach(matches, ele => {
        if (ele.toss_winner_team != 'no toss' && ele.toss_winner_team != undefined) {
          $http.get(SCORES + "?unique_id=" + ele.unique_id).then((resp) => {
            let score = resp.data.score;
            let score_arr = score.split(' v ')
            ele.team1 = score_arr[0];
            ele.team2 = score_arr[1];
          });
          $scope.ongoingMatches.push(ele);
        }
      })
    });

    // $interval(() => {
    //   angular.forEach($scope.ongoingMatches,(ele) => {
    //     console.log("Calling for a different time");
    //     $http.get(SCORECARD + "?unique_id=" + ele.unique_id).then((resp) => {
    //       let score = resp.data.score;
    //       let score_arr = score.split(' v ')
    //       ele.team1 = score_arr[0];
    //       ele.team2 = score_arr[1];
    //       console.log("updated score after timeout is ", resp.data);
    //     });
    //   })
    // },2000);

    $scope.match_id = Data;

    $scope.idToScoreboard = (id) => {
      $scope.match_id.MatchId = id;
      $location.path("/scorecard");
    }
  })
  .controller('ScoreCard', function ($scope, Data, $interval, $http, $location) {
    $scope.match_id = Data;
    $scope.showScorecard = true;
    $scope.response;
    $scope.inning_arr = ["1st inning", "2nd inning", "3rd inning", "4th inning"];
    $scope.inningNumber = 0;
    
    $http.get(SCORECARD+"?unique_id=1233972").then((resp) => {     //+$scope.match_id.MatchId
      $scope.response = resp.data.data;
      $scope.inningNumber = $scope.response.batting.length-1;
      $scope.inning = $scope.inning_arr[$scope.inningNumber];  
    })

    $scope.player_id = Data;
    $scope.playerProfile = (id) => {
      $scope.player_id.PlayerId = id;
      $location.path("/playerprofile");
    }

    $scope.changeInning = () => {
      if($scope.inning == '1st inning')
        $scope.inningNumber = 0;
      else if($scope.inning == '2nd inning')
        $scope.inningNumber = 1;
      else if($scope.inning == '3rd inning')
        $scope.inningNumber = 2;
      else if($scope.inning == '4th inning')
        $scope.inningNumber = 3;  
    }
  })
  .controller('PlayerProfile', function ($scope, Data, $interval, $http, $location) {
    $scope.player_id = Data;
  });
