'use strict';

angular.module('webApp')
  .controller('gameCtrl', ['$scope', '$rootScope', 'Game',
    function($scope,$rootScope, Game) {
      $scope.msg = 'Welcome in Game Page';

      $rootScope.countDownObj = null;
      $scope.gameStarted = false;
      $scope.showResult = false;
      $scope.userCard = '';
      $scope.count = '';
      $scope.computerCard = '';
      $scope.winsUser = 0;
      $scope.winsComputer = 0;
      $scope.ties = 0;
      $scope.resultVal = null;

      $scope.startGame = function(){
        $scope.showResult = false;
        $scope.gameStarted = Game.startCountDown(5);
        $scope.userCard = 'Rock_shape_chosen';
        Game.sendUserCard('Rock_shape_chosen');
      }  

      $scope.selectCard = function(card){
        if ($scope.gameStarted) {
          $scope.userCard = card;
          Game.sendUserCard(card);
        };
      }
      
      $rootScope.destroyCountDownObj = $rootScope.$on('countDownObj',function(event, countDownObj){
        if (countDownObj != null && countDownObj != undefined && $scope.gameStarted == true) {
          
          $scope.count = countDownObj.count;
          $scope.computerCard = countDownObj.computerCard;
          if ( $scope.count == 0) {
            $scope.gameStarted = false;

            var result = Game.calculateResult();
            
            $scope.resultText = result.resultText;
            $scope.resultVal = result.resultVal;
            $scope.showResult = true;
            if (result.resultVal == 1) {
              $scope.winsUser++;
            }else if (result.resultVal == 0) {
              $scope.ties++;
            }else if (result.resultVal == -1) {
              $scope.winsComputer++;
            };

          };
          $scope.$digest();
        }
      },true);


}]);
