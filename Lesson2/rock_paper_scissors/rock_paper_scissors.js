const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayWinner(user, computer) {
  if ((user === 'rock' && computer === 'scissors') || 
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')) {
    prompt('You win!');
  } else if ((user === 'rock' && computer === 'paper') || 
             (user === 'paper' && computer === 'scissors') || 
             (user === 'scissors' && computer === 'rock')) {
    prompt('Computer wins!');
  } else {
    prompt('It is a tie!');
  }
}

while(true) {

  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt('That is not a valid choice');
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random()*VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  displayWinner(choice, computerChoice);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while(answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "n" or "y"');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;

}


