/*
	TIC-TAC-BR 2014
	=======================================================
	This is a Tic-Tac-Toe based on 2014 elections in Brazil, 
	having as characters the current President Dilma Roussef and former candidate Aécio Neves.

	The MIT License (MIT)
	Copyright (c) 2014 Keven Jesus (github.com/kevenjesus)
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

var ticTacBR = (function(){
	/* variables */
	var aecio, 
		dilma, 
		currentPlayer,
		forms = [1, 2],
		board = new Array(9),
		inner,
		winner,
		gameAgain;		

	/* define player name and form */
	function Player(name, form) {
		this.name = name;
		this.form = form;
	}

	/* define array game */
	function setBoard(){
		board = new Array(9);
	}

	/* define game winner */
	function setWins(wins){
		var randomWinner = Math.floor(Math.random() * (3 - 1) + 1);
		var	folder = (wins.form === 1 ? 'assets/img/dilma' : 'assets/img/aecio');
		gameAgain.html('<img src="'+folder+'/'+randomWinner+'.gif" alt="'+wins.name+' ganhou" />');
		winner.removeClass('hidden');
		reset();
	}

	/* define game over */
	function setGameOver(){
		gameAgain.html('<img src="assets/img/gameover.gif" alt="Gameover deu velha" />');
		winner.removeClass('hidden');
		reset();
	}

	/* defines elements that give the winner */
	function setElements(){
		elementsLine();
		elementsIsColumn();
		elementsIsDiagonal();
	}
 
	/* Restart game */
	function reset() {
		inner.html('');
		setBoard();
	}

	/* if check game is over */
	function boardIsFull() {
		var preenchidos = 0;
		for(var i = 0; i < board.length; i++)
			if(board[i]	!== undefined) 
				preenchidos++;
			return preenchidos == board.length;
	}

	/* check winner is some line */
	function elementsLine() {
		for( var i = 0; i < 7; i += 3) {
			if ( board[i] === 1 && board[i + 1] === 1 && board[i + 2] === 1 ) { 
				setWins(aecio);
			}
			if ( board[i] === 2 && board[i + 1] === 2 && board[i + 2] === 2 ) {
				setWins(dilma);
			}
		}
	}

	/* check winner is some column */
	function elementsIsColumn() {
		for( var i = 0; i < 3; i++) {
			if ( board[i] === 1 && board[i + 3] === 1 && board[i + 6] === 1 ) { 
				setWins(aecio);
			}
			if ( board[i] === 2 && board[i + 3] === 2 && board[i + 6] === 2 ) {
				setWins(dilma);
			}
		}

	}

	/* cheeck winner is some diagonal */
	function elementsIsDiagonal() {
		if ( (board[0] == 1 && board[4] == 1 && board[8] == 1) ||
			(board[2] == 1 && board[4] == 1 && board[6] == 1)) {
			setWins(aecio);
		} else if ( (board[0] == 2 && board[4] == 2 && board[8] == 2) ||
			(board[2] == 2 && board[4] == 2 && board[6] == 2) ) {
			setWins(dilma);
		} 
	}

	/* start game */
	function initGame() {
		aecio = new Player("Aécio Neves", 0);
		dilma = new Player("Dilma Rousseff", 1);
		inner = $('.inner');
		winner = $('.winner');
		gameAgain = $('.again');
		currentPlayer = aecio;

		inner.on('click',function(e){
			e.preventDefault();
			var index = $(this).attr('data-cel'); 
			var img = (currentPlayer.form == 1 ? 'assets/img/1.png' : 'assets/img/2.png');

			$(this).html('<img src="'+img+'" />');
			board[index] = forms[currentPlayer.form];

				(currentPlayer.form == 0) ? currentPlayer = dilma : currentPlayer = aecio;
				setElements();

			if (boardIsFull())
				setGameOver();
		});

		gameAgain.on('click',function(e){
			e.preventDefault();
			winner.addClass('hidden');
		});
	}

	return{
		initGame:initGame
	}
})();
ticTacBR.initGame();
