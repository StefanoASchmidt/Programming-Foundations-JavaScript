const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1,2,3], [1,4,7], [1,5,9],
  [2,5,8], [3,5,7], [3,6,9],
  [4,5,6], [7,8,9]
];

let readline = require('readline-sync');

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function getWinningScore() {
  prompt('What round format do you want to play?');
  prompt('(1) best of one, (2) best of three, (3) best of five, (4) best of seven');

  let answer = readline.question();

  while(!['1','2','3','4'].includes(answer)) {
    prompt('Please choose 1, 2, 3, or 4');
    answer = readline.question();
  }

  return Number(answer);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayBoard(board, score, name) {
  console.clear();

  displayScore(score, name);
  console.log('');
  console.log('1        |2        |3');
  console.log('         |         |');
  console.log(`    ${board['1']}    |    ${board['2']}    |    ${board['3']}`);
  console.log('         |         |');
  console.log('         |         |');
  console.log('---------+---------+---------');
  console.log('4        |5        |6');
  console.log('         |         |');
  console.log(`    ${board['4']}    |    ${board['5']}    |    ${board['6']}`);
  console.log('         |         |');
  console.log('         |         |');
  console.log('---------+---------+---------');
  console.log('7        |8        |9');
  console.log('         |         |');
  console.log(`    ${board['7']}    |    ${board['8']}    |    ${board['9']}`);
  console.log('         |         |');
  console.log('         |         |');
  console.log('');
  console.log(`${name} is ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log('');
}

function initializeScore() {
  let score = {player: 0, computer: 0};
  return score;
}

function displayScore(score, name) {
  console.log(`SCORE: ${name} ${score['player']} - Computer ${score['computer']}`);
}


function joinOr(arr, delim = ', ', conj = 'or') {
  arr = arr.slice();

  if (arr.length > 2) {
    arr[arr.length - 1] = `${conj} ${arr[arr.length - 1]}`;
    return arr.join(delim);
  } 

  return arr.join(` ${conj} `);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => {
    return board[key] === INITIAL_MARKER;
  });
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;

    prompt('Sorry, that is not a valid choice.');
  }

  board[square] = HUMAN_MARKER;
}

function threat(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let currentLine = WINNING_LINES[line];
    let currentLineEmpty = currentLine.filter(num => board[num] === INITIAL_MARKER);
    let currentLineThreat = currentLine.filter(num => board[num] === HUMAN_MARKER);

    if (currentLineEmpty.length === 1 && currentLineThreat.length === 2) {
      return currentLine;
    }
  }

  return null;
}

function attack(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let currentLine = WINNING_LINES[line];
    let currentLineEmpty = currentLine.filter(num => board[num] === INITIAL_MARKER);
    let currentLineThreat = currentLine.filter(num => board[num] === COMPUTER_MARKER);

    if (currentLineEmpty.length === 1 && currentLineThreat.length === 2) {
      return currentLine;
    }
  }

  return null;
}

function computerChoosesSquare(board) {
  let attackLine = attack(board);
  let threatLine = threat(board);
  let square;

  if (attackLine) {
    square = attackLine.filter(num => board[num] === INITIAL_MARKER)[0]; 
  } else if (threatLine) {
    square = threatLine.filter(num => board[num] === INITIAL_MARKER)[0];
  } else if (emptySquares(board).includes('5')) {
    square = '5';
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }
  
  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];
    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'You';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}


function updateScore(board, score) {
  let winner = detectWinner(board);
  if (winner) {
    if (winner === 'Computer') {
      score['computer'] += 1;
    } else {
      score['player'] += 1;
    }
  } 
}

function someoneWonGame(score, winningScore) {
  return (score['player'] === winningScore ||
          score['computer'] === winningScore);
}

function someoneWon(board) {
  return !!detectWinner(board);
}

console.clear();

prompt('Welcome to Tic Tac Toe!');
prompt('What is your name?');
let name = readline.question();

while(true) {
  let winningScore = getWinningScore();
  let score = initializeScore();

  while(true) {
    let board = initializeBoard();
    displayBoard(board, score, name);
  
    while(true) {
      displayBoard(board, score, name);
  
      playerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;
  
      computerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;
    }
    
    updateScore(board, score);
    displayBoard(board, score, name);
  
    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won the round!`);
    } else {
      prompt("It's a tie!");
    }

    if (someoneWonGame(score, winningScore)) {
      prompt(`${detectWinner(board)} won the game!`);
      break;
    }

    prompt('Press enter to play next round');
    readline.question();
  }


  prompt('Play again? (y/n)');
  let answer = readline.question().toLowerCase();

  while(!['y','n'].includes(answer)) {
    prompt("Please enter 'y' or 'n'");
    answer = readline.question().toLowerCase();
  }

  if (answer !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe!');