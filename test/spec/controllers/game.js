'use strict';

describe('Controller: gameCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var gameCtrl, scope, timerCallback;
  var Game;
  var rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Game, _$q_) {
    timerCallback = jasmine.createSpy('timerCallback');
    
    jasmine.Clock.useMock();
    scope = $rootScope.$new();
    rootScope = $rootScope;
    Game = Game;
    gameCtrl = $controller('gameCtrl', {
      $scope: scope,
      Game: Game
    });
  }));

  it('should be showed a Welcome massage', function () {
    expect(scope.msg).toEqual('Welcome in Game Page');
  });


  it('Testing startGame function', function () {
    scope.startGame();
    expect( scope.gameStarted ).toEqual(true);
    
  });

  it('Testing logic for User card egual Rock', function () {
    scope.startGame();
    scope.selectCard('Rock_shape_chosen');
    var computerCard = '';
    var resultVal = false;

    waits(7000);

    runs(function() {
      computerCard = scope.computerCard;
      resultVal = scope.resultVal;
      if ( computerCard == "Rock_shape_chosen" ) {
        expect( resultVal ).toEqual( 0 );
      }else if ( computerCard == "Paper_shape_chosen") {
        expect( resultVal ).toEqual( -1 );
      }else if ( computerCard == "Scissor_shape_chosen") {
        expect( resultVal ).toEqual( 1 );
      };
    });

  });

  it('Testing logic for User card egual Paper', function () {
    scope.startGame();
    scope.selectCard('Paper_shape_chosen');
    var computerCard = '';
    var resultVal = false;

    waits(7000);

    runs(function() {
      computerCard = scope.computerCard;
      resultVal = scope.resultVal;
      if ( computerCard == "Rock_shape_chosen" ) {
        expect( resultVal ).toEqual( 1 );
      }else if ( computerCard == "Paper_shape_chosen") {
        expect( resultVal ).toEqual( 0 );
      }else if ( computerCard == "Scissor_shape_chosen") {
        expect( resultVal ).toEqual( -1 );
      };
    });

  });

  it('Testing logic for User card egual Scissor', function () {
    scope.startGame();
    scope.selectCard('Scissor_shape_chosen');
    var computerCard = '';
    var resultVal = false;

    waits(7000);

    runs(function() {
      computerCard = scope.computerCard;
      resultVal = scope.resultVal;
      if ( computerCard == "Rock_shape_chosen" ) {
        expect( resultVal ).toEqual( -1 );
      }else if ( computerCard == "Paper_shape_chosen") {
        expect( resultVal ).toEqual( 1 );
      }else if ( computerCard == "Scissor_shape_chosen") {
        expect( resultVal ).toEqual( 0 );
      };
    });

  });



});
