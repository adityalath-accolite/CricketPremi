'use strict';

const KEY = '58sYxn59vnTFZgFdatNq9ciyytm2';  
//fWOeJIGXHcUNEzDuhw0IIF7n5qa2  
//4jUt8b9e8xMvcEyPQJkNh8nPaTw1  
//qN5lGSliJEWyEQR645HO7saiS6S2 
//58sYxn59vnTFZgFdatNq9ciyytm2  
//Rf0L4fPzDHfY3JTahEdvwZcXc5p1
//A68hPrwaP8WNWpamBjAspz6ohfh2
//G5wcmlLCHSULqr1SuBKeVfxHA1d2
//sDAFgcvvRaaWwq8glexqgpTGkl82

const CRIC_URL = 'http://cricapi.com/api/matches/' + KEY;
const SCORES = 'https://cricapi.com/api/cricketScore/' + KEY;
const SCORECARD = 'https://cricapi.com/api/fantasySummary/' + KEY;
const PLAYER_INFO = 'https://cricapi.com/api/playerStats/' + KEY;

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
    $scope.ongoingMatches = [];

    let updateScore = () => {
      angular.forEach($scope.ongoingMatches,(ele) => {
        $http.get(SCORES + "?unique_id=" + ele.unique_id).then((resp) => {
          ele.score_arr = resp.data.score.split(' v ');
        });
      })
    }

    $http.get(CRIC_URL).then((resp) => {
      angular.forEach(resp.data.matches, ele => {
        if (ele.toss_winner_team != 'no toss' && ele.toss_winner_team != undefined)
          $scope.ongoingMatches.push(ele);
      })
      updateScore();
    });

    // $interval(() => {
    //   updateScore();
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
    $scope.inningNumber;
    $scope.score_arr;

    let updateScore = () => {
      $http.get(SCORES + "?unique_id=" + $scope.match_id.MatchId).then((resp) => {      //SCORES + "?unique_id=" + $scope.match_id.MatchId   SCORES + "?unique_id=1233972"
        let arr = resp.data.score.split(' v ');
        angular.forEach(arr, (ele) => {
          let str = $scope.response.batting[0].title.split(' ');
          if (ele.includes(str[0])) 
            $scope.score_arr[0] = ele;
          else 
            $scope.score_arr[1] = ele;
        })
      })
    }
    
    let updateScorecard = async () => {
      await $http.get(SCORECARD + "?unique_id=" + $scope.match_id.MatchId).then((resp) => {     //SCORECARD + "?unique_id=" + $scope.match_id.MatchId   SCORECARD + "?unique_id=1233972"  
        $scope.response = resp.data.data;
      })
      return 0;
    }

    let promise = new Promise((pass) => {
      pass(updateScorecard());
    })

    promise.then(resp => {
      $scope.inningNumber = $scope.response.batting.length - 1;
      $scope.inning = $scope.inning_arr[$scope.inningNumber];
      $scope.score_arr = [1,2];
      updateScore();
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

    // $interval(() => {
    //   updateScore();
    //   updateScorecard();
    // }, 2000);
  })
  .controller('PlayerProfile', function ($scope, Data, $http) {
    $scope.player_id = Data;
    $scope.response;
    $scope.property = ['Batting','Bowling','Fielding'];
    $scope.propertyValue = 'Batting';
    $http.get(PLAYER_INFO + "?pid=" + $scope.player_id.PlayerId).then((resp) => {    //PLAYER_INFO + "?pid=" + $scope.player_id.PlayerId    PLAYER_INFO + "?pid=35320"
      $scope.response = resp.data;      
    })
  });
