'use strict';


var app = angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);


app.factory('Game', function($rootScope) {

  var _computerCard = '';
  var _userCard = '';
  var _resultText = '';
  var _resultVal = '';

  var _startCountDown = function(count){

    var handleTimer = function() {
      
      count--;

      var randomCard = Math.floor(Math.random() * 3) + 1;
      switch (randomCard){
        case 1:
          _computerCard = 'Paper_shape_chosen';
          break;
        case 2:
          _computerCard = 'Scissor_shape_chosen';
          break;
        case 3:
          _computerCard = 'Rock_shape_chosen';
          break;
      }

      if(count == 0) {
        clearInterval(timer);
      }

      
      var countDownObj = {count:count,computerCard:_computerCard};
      $rootScope.$emit('countDownObj',countDownObj);
      
    }
    
    var timer = setInterval(function() { handleTimer(count); }, 1000);
    return true

  }

  var _saveUserCard = function(userCard){
    
    _userCard = userCard;
  }

  var _calculateResult = function(){
    
    

    switch ( _userCard ) {
      case "Rock_shape_chosen":
        if ( _computerCard == "Rock_shape_chosen" ) {
          _resultText = "result_tie";
          _resultVal = 0;
        }else if ( _computerCard == "Paper_shape_chosen") {
          _resultText = "result_paper_rock";
          _resultVal = -1;
        }else if ( _computerCard == "Scissor_shape_chosen") {
          _resultText = "result_rock_scissor";
          _resultVal = 1;
        };
        break;
      case "Paper_shape_chosen":
        if ( _computerCard == "Rock_shape_chosen" ) {
          _resultText = "result_paper_rock";
          _resultVal = 1;
        }else if ( _computerCard == "Paper_shape_chosen") {
          _resultText = "result_tie";
          _resultVal = 0;
        }else if ( _computerCard == "Scissor_shape_chosen") {
          _resultText = "result_scissor_paper";
          _resultVal = -1;
        };
        break;
      case "Scissor_shape_chosen":
        if ( _computerCard == "Rock_shape_chosen" ) {
          _resultText = "result_rock_scissor";
          _resultVal = -1;
        }else if ( _computerCard == "Paper_shape_chosen") {
          _resultText = "result_scissor_paper";
          _resultVal = 1;
        }else if ( _computerCard == "Scissor_shape_chosen") {
          _resultText = "result_tie";
          _resultVal = 0;
        };
        break;
    };
    return {resultVal: _resultVal, resultText: _resultText};

  }

  return {    
    startCountDown: function(count) { return _startCountDown(count) },
    calculateResult: function() { return _calculateResult() },
    sendUserCard: function(userCard) { return _saveUserCard(userCard) }
  };

});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/game', {
      controller: 'gameCtrl',
      templateUrl: 'views/game.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});


