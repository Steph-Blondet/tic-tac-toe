console.log('testing file');

window.onload = function() {
	console.log('app.js');

	// grabbing DOM elements
	var board = document.querySelector('#board');
	var reset = document.querySelector('#clear-board');

	reset.addEventListener('click', createBoard); // event listener for clear board button

	createBoard(); // board function is the same as the clear board handler

} //--> end window.onload


// GLOBAL VARIABLES
var turn; // determines whether its X's or O's turn

var numTurns; // number of turns used to determine a tie

var equis,
    cero; // positions of X and O


// WINNING CONDITIONS
var winningConditions = [
              [0, 1, 2], [3, 4, 5], [6, 7, 8],
              [0, 3, 6], [1, 4, 7], [2, 5, 8],
              [0, 4, 8], [2, 4, 6]
             ];


// CREATE BOARD AND RESET BUTTON
var createBoard = function() {
	console.log('board is created'); // to check if the board was created

	turn = true;
  numTurns = 0;

	equis = [];
  cero = [];

	board.innerHTML = ""; // clears out previously existing board

	for (var i=0; i < 9; i++) { // creating 9 divs and giving each one an event listener
		var square = document.createElement('div'); // creating div
		square.classList.add('square'); // adding the square class to the div
		square.id = i; // giving the square class a number id
		board.appendChild(square); // appending the new div to the board
		square.addEventListener('click', game); // adding event listener
	}
} //--> end createBoard


// INDIVIDUAL SQUARES
var game = function() {
	console.log('a square has been clicked'); // to check when a square has been clicked

	if (!this.className.includes("clicked")) { // a user won't be able to click again on a square if the div includes the class clicked

		if (turn) { // if statement to determine whether X or O is displayed
			this.innerHTML = 'X';
			equis.push(this.id); // push id into equis
		} else {
			this.innerHTML = '0';
			cero.push(this.id); // push id into cero
		}

		this.className += " clicked"; // adding class of clicked

		turn = !turn; // switches from X to 0

		checkingWin(); // checks the winner
	}
} //--> end game function



// CHECKING WINS
var checkingWin = function() {

	numTurns++; // increases numTurns because it has been clicked

	var squares = document.getElementsByClassName('square'); // getting the element by its class

	if (checkSpaces(equis)) {
		for (var i=0; i < squares.length; i++) {
			squares[i].innerHTML = 'X wins'
		}
	} else if (checkSpaces(cero)) {
		for (var j=0; j < squares.length; j++) {
			squares[j].innerHTML = '0 wins'
		}
	} else if (numTurns == 9) {
		board.innerHTML = "Nobody won.";
	}
} //--> end checkingWin



var checkSpaces = function(playerSpaces) {
	for (var i=0; i < winningConditions.length; i++) { // loops over the winningConditions array

		var hits = 0; // setting hits to 0

		for (var j=0; j < winningConditions[i].length; j++) { // looping inside of the individual arrays

			for (var k=0; k < playerSpaces.length; k++) {
				if (winningConditions[i][j] == playerSpaces[k]) {
					hits++; // if there is a match, increase the hits variable
				}
			}
		}

		if (hits == 3) { // if it hits to 3, we have a winner
      return true
    };
	}

	return false // no win
} //--> end checkSpaces
