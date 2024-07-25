let origBoard;
let huPlayer = 'X'; // Default human player to 'X'
let aiPlayer = 'O'; // Default AI player to 'O'
let mode = 'Two players'; // Default to Two players
let player1Name = '';  // Variable to store Player 1's name (X)
let player2Name = '';  // Variable to store Player 2's name (O)
let currentPlayer = 'X'; // Track the current player for two-player mode
let check = true;
let cont = false;
let one_player = false;
let idd;
let con = false;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];

const questionsAndAnswers = [
  { Question: "2 + 2", Answer: "4" },
  { Question: "6 - 2", Answer: "4" },
  { Question: "2 x 5", Answer: "10" },
  { Question: "12 / 4", Answer: "3" },
  { Question: "13 x 2", Answer: "26" },
  { Question: "7 - 5", Answer: "2" },
  { Question: "17 + 5", Answer: "22" },
  { Question: "3 x 2", Answer: "6" },
  { Question: "20 x 3", Answer: "60" },
  { Question: "43 - 7", Answer: "36" },
  { Question: "36 / 6", Answer: "6" }
];

function getRandomQuestion() {
  let randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
  return questionsAndAnswers[randomIndex];
}

let randomQuestion = getRandomQuestion();
document.getElementById("ques").innerText = randomQuestion.Question;
function getRandomElements(questionsAndAnswers, items = 10){
  return [...questionsAndAnswers].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, items)
}

const cells = document.querySelectorAll('.cell');
// ... (rest of your code)

// Define the titlle variable at the beginning
const title = document.querySelector('#gameTitle'); // Get the title element for turn display

// ... (rest of your code)
function selectMode(statu) {
  mode = statu;
  if (mode === 'One player') {
    one_player = true;
    // If One player is chosen, hide the mode selection and show symbol selection
    document.querySelector('.select').style.display = "none";
    document.querySelector('.selectSym').style.display = "block";
  } else if (mode === 'Two players') {
    one_player = false;
    // If Two players is chosen, hide the mode selection and show the form
    document.querySelector('.select').style.display = "none";
    document.querySelector('form').style.display = "block"; // Show the form
  } 
}

// Function to select the player's symbol (X or O)
function selectSym(sym) {
  huPlayer = sym;
  aiPlayer = sym === 'O' ? 'X' : 'O';
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', turnClick, false);
  }
  if (mode === 'One player' && aiPlayer === 'X') { // AI's first move if One player mode
    turn(bestSpot(), aiPlayer);
  }
  document.querySelector('.selectSym').style.display = "none";
}
// Function to start the game 
function startGame() {
  if(document.querySelector('.select').style.display == "none")
  {
  document.querySelector('.endgame').style.display = "none";
  document.querySelector('.endgame .text').innerText = "";
  document.getElementById("questions").style.display = "none";
    removeSadEmojis();
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
  if (mode === 'One player') {
    document.querySelector('.selectSym').style.display = "block"; // Show symbol selection for One player
  } else if (mode === 'Two players') {
    // In two-player mode, we will use the 'start' function to handle turns
    // Set the initial turn to 'X'
    origBoard = Array.from(Array(9).keys()); // Initialize origBoard when starting a new game
    currentPlayer = 'X';
    title.innerHTML = player1Name + ' turn'; // Update the title element
  }
  }
}
  // ... (rest of your code)
  // Function to handle a player's turn 
  function turnClick(square) {
    if (typeof origBoard[square.target.id] === 'number') {
      // In one-player mode, the human always plays with 'huPlayer'
      if (mode === 'One player') {
        if(document.querySelector('.select').style.display == "none" &&
          document.querySelector('.selectSym').style.display != "block" && document.querySelector('.endgame').style.display != "block")
        {selectedSquare = square.target.id;
          document.querySelector("#questions").style.display = "block";
        }}
      else if (mode === 'Two players') {
        if(document.querySelector('.select').style.display == "none" &&
          document.querySelector('.selectSym').style.display != "block" &&
          document.querySelector('form').style.display != "block" && document.querySelector('.endgame').style.display != "block")
          // In two-player mode, use the 'start' function to handle turns
         document.querySelector("#questions").style.display = "block"; 
        }
      }
  }


// ... (other code)

let randomQuestionSubset = getRandomElements(questionsAndAnswers);
let currentQuestionIndex = 0;

document.getElementById("ques").innerText = randomQuestionSubset[currentQuestionIndex].Question;

// ... (other code)

function game(){
  if(document.getElementById("intext").value !==""){
  cont = true;
    var user = document.getElementById("intext").value;
    if(user == randomQuestionSubset[currentQuestionIndex].Answer){
        document.getElementById("ans").innerHTML ="Your Answer is Correct";
      check = true;
    }    
    else {
        document.getElementById("ans").innerHTML ="Correct Answer is :" + randomQuestionSubset[currentQuestionIndex].Answer;
    check = false; 
    } 
  }
}
function continuee(){
  if(cont){
  if(one_player)
  {
       if(check)
       {
         turn(selectedSquare, huPlayer); 
          selectedSquare = null;

      if (!checkWin(origBoard, huPlayer) && !checkTie())  { 
          setTimeout(function(){
              turn(bestSpot(), aiPlayer);
        },1000);
      }
       }
     else {
         setTimeout(function(){
       if( cells[0].innerHTML == cells[1].innerHTML && cells[1].innerHTML == aiPlayer )
       {
         turn(2, aiPlayer);
          selectedSquare = 2;
         con = true;
       }
       else if( cells[2].innerHTML == cells[1].innerHTML && cells[1].innerHTML == aiPlayer )
       {
         turn(0, aiPlayer);
          selectedSquare = 0;
         con = true;
       }
       else if( cells[0].innerHTML == cells[2].innerHTML && cells[0].innerHTML == aiPlayer )
       {
          turn(1, aiPlayer);
          selectedSquare = 1;
         con = true;
       }
       else if( cells[3].innerHTML == cells[4].innerHTML && cells[3].innerHTML == aiPlayer )
       {
          turn(5, aiPlayer);
          selectedSquare = 5;
         con = true;
       }
       else if( cells[5].innerHTML == cells[4].innerHTML && cells[4].innerHTML == aiPlayer )
       {
          turn(3, aiPlayer);
          selectedSquare = 3;
         con = true;
       }
       else if( cells[3].innerHTML == cells[5].innerHTML && cells[5].innerHTML == aiPlayer )
       {
          turn(4, aiPlayer);
          selectedSquare = 4;
         con = true;
       }
       else if( cells[6].innerHTML == cells[7].innerHTML  && cells[6].innerHTML == aiPlayer )
       {
          turn(8, aiPlayer);
          selectedSquare = 8;
         con = true;
       }
       else if( cells[8].innerHTML == cells[7].innerHTML && cells[8].innerHTML == aiPlayer )
       {
          turn(6, aiPlayer);
          selectedSquare = 6;
         con = true;
       }
       else if( cells[6].innerHTML == cells[8].innerHTML && cells[8].innerHTML == aiPlayer )
       {
          turn(7, aiPlayer);
          selectedSquare = 7;
          con = true;
       }
       else if( cells[0].innerHTML == cells[3].innerHTML && cells[0].innerHTML == aiPlayer )
       {
         turn(6, aiPlayer);
          selectedSquare = 6;
           con = true;
       }
       else if( cells[3].innerHTML == cells[6].innerHTML && cells[6].innerHTML == aiPlayer )
       {
         turn(0, aiPlayer);
          selectedSquare = 0;
          con = true;
       }
       else if( cells[0].innerHTML == cells[6].innerHTML && cells[6].innerHTML == aiPlayer )
       {
         turn(3, aiPlayer);
          selectedSquare = 3;
          con = true;
       }
       else if( cells[1].innerHTML == cells[4].innerHTML && cells[1].innerHTML == aiPlayer )
       {
         turn(7, aiPlayer);
          selectedSquare = 7;
          con = true;
       }
       else if( cells[4].innerHTML == cells[7].innerHTML && cells[7].innerHTML == aiPlayer )
       {
         turn(1, aiPlayer);
          selectedSquare = 1;
          con = true;
       }
       else if( cells[1].innerHTML == cells[7].innerHTML && cells[1].innerHTML == aiPlayer )
       {
         turn(4, aiPlayer);
          selectedSquare = 4;
          con = true;
       }
       else if( cells[2].innerHTML == cells[5].innerHTML && cells[5].innerHTML == aiPlayer )
       {
         turn(8, aiPlayer);
          selectedSquare = 8;
           con = true;
       }
       else if( cells[5].innerHTML == cells[8].innerHTML && cells[8].innerHTML == aiPlayer )
       {
         turn(2, aiPlayer);
          selectedSquare = 2;
           con = true;
       }
       else if( cells[2].innerHTML == cells[8].innerHTML && cells[8].innerHTML == aiPlayer )
       {
         turn(5, aiPlayer);
          selectedSquare = 5;
            con = true;
       }
       else if( cells[0].innerHTML == cells[4].innerHTML && cells[4].innerHTML == aiPlayer )
       {
          turn(8, aiPlayer);
          selectedSquare = 8;
            con = true;
       }
       else if( cells[8].innerHTML == cells[4].innerHTML && cells[4].innerHTML == aiPlayer )
       {
          turn(0, aiPlayer);
          selectedSquare = 0;
           con = true;
       }
       else if( cells[0].innerHTML == cells[8].innerHTML && cells[8].innerHTML == aiPlayer )
       {
          turn(4, aiPlayer);
          selectedSquare = 4;
            con = true;
       }
       else if( cells[2].innerHTML == cells[4].innerHTML && cells[4].innerHTML == aiPlayer )
       {
          turn(6, aiPlayer);
          selectedSquare = 6;
           con = true;
       }
       else if( cells[2].innerHTML == cells[6].innerHTML && cells[6].innerHTML == aiPlayer )
       {
          turn(4, aiPlayer);
          selectedSquare = 4;
           con = true;
       }
       else if( cells[4].innerHTML == cells[6].innerHTML && cells[6].innerHTML == aiPlayer )
       {
          turn(2, aiPlayer);
          selectedSquare = 2;
            con = true;
       }
      selectedSquare = null;
      if (!checkWin(origBoard, huPlayer) && !checkTie() && con == false )  { 
              turn(bestSpot(), aiPlayer); 
      }
        con = false;
          },1000);
          }
       
  }
  else{
    if(check)
    {
      start(idd);
      turn(idd, currentPlayer);
      // Switch to the next player only after a valid move and no win
      if (!checkWin(origBoard, currentPlayer) && !checkTie()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if(currentPlayer === 'X')
        title.innerHTML = player1Name + ' turn';
        else
        title.innerHTML = player2Name + ' turn';
      }
    }
    else{
      {
        if(currentPlayer == 'X')
          currentPlayer = 'O';
      else
          currentPlayer = 'X';
    }
      if(currentPlayer === 'X')
        title.innerHTML = player1Name + ' turn';
        else
        title.innerHTML = player2Name + ' turn';
    }
  }
  currentQuestionIndex = (currentQuestionIndex + 1) % randomQuestionSubset.length; // Cycle through the subset
  document.getElementById("ans").innerHTML = "";
  document.getElementById("intext").value ="";
  document.getElementById("ques").innerText = randomQuestionSubset[currentQuestionIndex].Question;    
  document.getElementById("questions").style.display = "none";
}
  cont= false;
}
  // Function to update the game board and check for win/tie
  function turn(squareId, player) {
    // Update origBoard with the player's move
    origBoard[squareId] = player; // Update the origBoard array

    // Update the cell's content
    document.getElementById(squareId).innerHTML = player;

    // Check for a win or tie
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
    checkTie();
  }

  // Function to check if a player has won
  function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
      }
    }
    return gameWon;
  }

// Function to handle the game over state
// ... (rest of your code)

// ... (rest of your code)

function showConfetti() {
  // Import the confetti function
  const confetti =  window.confetti; 

  confetti({
    particleCount: 100, // Adjust particle count
    spread: 70, // Adjust spread
    origin: { y: 0.6 } // Adjust vertical origin
  });
}

let sadEmojis = []; // Declare the sadEmojis array here
function showSadEmojis() {
  const emojis = ['😭', '😔', '😢', '😥', '😩']; // Array of sad emojis
  const numEmojis = 5; // Number of emojis to display
  for (let i = 0; i < numEmojis; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const randomX = Math.random() * window.innerWidth; // Random horizontal position
    const randomY = Math.random() * window.innerHeight; // Random vertical position
    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = emoji;
    emojiSpan.style.position = 'absolute';
    emojiSpan.style.left = randomX + 'px';
    emojiSpan.style.top = randomY + 'px';
    emojiSpan.style.fontSize = '3em'; // Adjust emoji size
    document.body.appendChild(emojiSpan);
    sadEmojis.push(emojiSpan); // Add the emojiSpan to the array
  }
}
function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === huPlayer ? "#4a64a1" : "#a44c94";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  // Determine the winner and declare it based on the player names
  let winnerName = gameWon.player === huPlayer ? (mode === 'One player' ? 'You' : player1Name) : player2Name; 
  if (mode === 'One player' && gameWon.player !== huPlayer) {
    // If one-player mode and AI wins, display "You lose" and show sad confetti
    declareWinner("You lose!");
     showSadEmojis();
  } else {
    // Otherwise, display the winner's name and show regular confetti
    declareWinner(`${winnerName} wins!`);
    showConfetti(); 
  }
}
// Remove emojis when "Replay" or "Change Mode" is clicked
document.querySelector('.restart').addEventListener('click', () => {
  removeSadEmojis(); 
});
document.querySelector('.change').addEventListener('click', () => {
  removeSadEmojis(); 
});
function removeSadEmojis() {
  sadEmojis.forEach(emoji => {
    document.body.removeChild(emoji);
  });
  sadEmojis = []; // Clear the array
}

// ... (rest of your code)

// ... (rest of your code)
  // Function to declare the winner
  function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
  }

  // Function to get an array of empty squares on the board
  function emptySquares() {
    return origBoard.filter((elm, i) => i === elm);
  }

  // Function to find the best spot for the AI
  function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
  }
  
  // Function to check if the game has resulted in a tie
function checkTie() {
  if (emptySquares().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "#015654";
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}

  // Minimax algorithm for AI decision making
  function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);
    if (checkWin(newBoard, huPlayer)) {
      return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;
      if (player === aiPlayer)
        move.score = minimax(newBoard, huPlayer).score;
      else
        move.score = minimax(newBoard, aiPlayer).score;
      newBoard[availSpots[i]] = move.index;
      if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
        return move;
      else
        moves.push(move);
    }
    let bestMove, bestScore;
    if (player === aiPlayer) {
      bestScore = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      bestScore = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
  // Function to handle player turns in two-player mode
  function start(id) {
    let elem = document.getElementById(id);
    if (turn === 'X' && elem.innerHTML === '') {
      elem.innerHTML = 'X';
      turn = 'O';
      title.innerHTML = player2Name + ' turn';
    } else if (turn === 'O' && elem.innerHTML === '') {
      elem.innerHTML = 'O';
      turn = 'X';
      title.innerHTML = player1Name + ' turn';
    }
    winner();
  }

// Function to check for a winner in two-player mode
function winner() {
  for (let i = 0; i < winCombos.length; i++) {
    if (cells[winCombos[i][0]].innerHTML === cells[winCombos[i][1]].innerHTML &&
        cells[winCombos[i][1]].innerHTML === cells[winCombos[i][2]].innerHTML &&
        cells[winCombos[i][0]].innerHTML !== '') {
      document.querySelector('.endgame').style.display = 'block';

      // Correct the winner declaration
      let winningPlayer = cells[winCombos[i][0]].innerHTML; 
      let winnerName = winningPlayer === 'X' ? player1Name : player2Name; 
      document.querySelector('.text').innerHTML = `${winnerName} Won!`; 

      for (let j = 0; j < cells.length; j++) {
        cells[j].removeEventListener('click', turnClick, false);
      }
      return; // Exit the loop if a winner is found
    }
  }
}

  // Add an event listener to the form
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the player names from the form inputs
    player1Name = document.querySelector('input[name="Player1(X)"]').value;
    player2Name = document.querySelector('input[name="Player2(O)"]').value;
   if(player1Name !="" &&  player2Name !="")
    // Hide the form and start the game
    document.querySelector('form').style.display = "none";
    startGame();
  });

  // Function to handle the "Change Mode" button
  function changeMode() {
    // Reset the game state
    startGame(); 

    // Show the mode selection and hide other elements
    document.getElementById("name0").value ="";
    document.getElementById("name1").value ="";
    document.querySelector('.select').style.display = "block";
    document.querySelector('.selectSym').style.display = "none";
    document.querySelector('form').style.display = "none";
    document.querySelector('#gameTitle').innerHTML = "<span>X O</span> Game";
    document.getElementById("questions").style.display = "none";
    removeSadEmojis();
  }

  // Add an event listener to the "Change Mode" button
  document.querySelector('.change').addEventListener('click', changeMode, false);
function two_players_by_questions(){
      if(document.querySelector('.select').style.display == "none" &&
        document.querySelector('.selectSym').style.display != "block" &&
        document.querySelector('form').style.display != "block" && document.querySelector('.endgame').style.display != "block")
document.getElementById('questions').style.display = "block"; // Use getElementById
}
function condition(id){
    if( !one_player)  
  idd = id ;
  two_players_by_questions();
}
