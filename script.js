var gameApp = angular.module('gameApp',["firebase"]); //DEPENDENCY INJECTIONS

var playerNum;

gameApp.controller('tttController',function($scope,$firebase){

	var ticTacRef = new Firebase("https://donut.firebaseio.com/games");//firebase

	var lastGame;
	// Ask for all existing game info from firebase
	ticTacRef.once('value', function(gamesSnapshot) {
		// get the actual games data
	  var games = gamesSnapshot.val();
		if(games == null)
		{
			// No games at all, so make a new game -- As if we're Areg
			lastGame = ticTacRef.push( {waiting: true} );
			playerNum = 1;
		}
		else	// I do have at least one game out there...
		{
		  var keys = Object.keys(games);
		  var lastGameKey = keys[ keys.length - 1 ];
		  var lastGame = games[ lastGameKey ];
			console.log("This person's game: " + lastGameKey);
		  if(lastGame.waiting)
		  {
		  	// Currently someone is waiting -- Areg is there and we're Rocky
		  	// Grab from Firebase its last game object
		  	lastGame = ticTacRef.child(lastGameKey);
		  	// Set a new game on this
		  	lastGame.set( {
		  		waiting:false, 
		  		clickedspaces: 0, 
		  		win: false, 
		  		board: [" "," "," "," "," "," "," "," "," "],
		  		counterX: 0,
		  		counterO: 0 
		  	} );
		  	playerNum = 2;
		  }
		  else
		  {
		  	// Make a new game -- As if we're Areg
				lastGame = ticTacRef.push( {waiting: true} );
				playerNum = 1;
		  }
		}
	  $scope.game = $firebase(lastGame);

	});

	var clickedspaces =1;	

	$scope.clicker = function(cellindex) {
		if($scope.game.board[cellindex] == " " && !$scope.game.win) {
			$scope.game.clickedspaces++;
			console.log($scope.game.clickedspaces);
	  		if ($scope.game.clickedspaces % 2 == 0) { 
				$scope.game.board[cellindex] = 'O';
				console.log($scope.game.board)
			} 
			else {
				$scope.game.board[cellindex] = 'X';
				console.log($scope.game.board)
			} 
			// $scope.game.board.push[cellindex];
			checkWin();
			console.log($scope.game.board)
			$scope.game.$save();
		} 
	};	

	$scope.reset = function(){
		// $scope.game.board = $scope.initial;		
		$scope.game.board = [" "," "," "," "," "," "," "," "," "];
		$scope.game.clickedspaces = 0;
		$scope.game.win = false;
		$scope.game.$save();

	};

	var checkWin = function() {
		console.log($scope.game.counterX);
		console.log($scope.game.counterO);
		//learn how to do cmmd +D

		if($scope.game.board[0] == $scope.game.board[1] &&
		 $scope.game.board[2] == $scope.game.board[1] && 
		 $scope.game.board[1]!== " "){
			$scope.game.win = true;
			if ($scope.game.board[0] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");	
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");				
			}
		}

		if ($scope.game.board[3] == $scope.game.board[4] && $scope.game.board[5]==$scope.game.board[4] && $scope.game.board[5]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[3] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");		
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");				
			}
		}
		if ($scope.game.board[6] == $scope.game.board[7] && $scope.game.board[8]==$scope.game.board[7] && $scope.game.board[8]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[6] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");				
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");				
			}
		}
		if ($scope.game.board[0] == $scope.game.board[3] && $scope.game.board[6]==$scope.game.board[3] && $scope.game.board[6]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[0] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");				
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");
			}
		}
		if ($scope.game.board[1] == $scope.game.board[4] && $scope.game.board[7]==$scope.game.board[4] && $scope.game.board[7]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[1] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");
			}
		}
		if ($scope.game.board[2] == $scope.game.board[5] && $scope.game.board[8]==$scope.game.board[5] && $scope.game.board[8]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[2] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");
			}
		}
		if ($scope.game.board[0] == $scope.game.board[4] && $scope.game.board[8]==$scope.game.board[4] && $scope.game.board[8]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[0] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");				
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");
			}		
		}
		if ($scope.game.board[2] == $scope.game.board[4] && $scope.game.board[6]==$scope.game.board[4] && $scope.game.board[6]!==" "){
			$scope.game.win = true;
			if ($scope.game.board[2] == 'X') {
				$scope.game.counterX++;
				$scope.game.$save();
				alert("X wins!");				
			} else {
				$scope.game.counterO++;
				$scope.game.$save();
				alert("O wins!");				
			}
		}	
		if ($scope.game.clickedspaces === 9 && !$scope.game.win) {
			alert("Draw!");
		}
		
	};

}); //end controller bracket		
//need to fix locked moves
//alerts display for both players not just the winner or the last person to make a move.
	



