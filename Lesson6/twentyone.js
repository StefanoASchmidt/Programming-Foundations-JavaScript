const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const CARD_VALUES = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
                      10: 10, 'Jack': 10, 'Queen': 10, 'King': 10 };
const SUIT_CODES = {'Hearts': 9829, 'Diamonds': 9830, 'Clubs': 9827, 'Spades': 9824};
const GAME_LIMIT = 21;
const ACE_MAX_VALUE = 11;
const ACE_MIN_VALUE = 1;
const CARD_DISPLAY_SIZE = 9;
let readline = require('readline-sync');

function displayBalance(chips) {
  console.log(`Available Chips: ${chips}`);
  return undefined;
}

function initializeDeck() {
  let deck = [];

  for (let count1 = 0; count1 < SUITS.length; count1 += 1) {
    for (let count2 = 0; count2 < VALUES.length; count2 += 1) {
      let card = {suit: SUITS[count1], val: VALUES[count2]};
      deck.push(card);
    }
  }

  return deck;
}

// note: this function mutates the deck in addition to giving a random card
function getRandomCard(deck) {
  let randomIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIndex, 1)[0];
}


function displayCards(cards, isDealer = false) {
  let suitStr1 = '';
  let suitStr2 = '';
  let valStr = '';
  
  for (let idx = 0; idx < cards.length; idx += 1) {
    if (isDealer && idx === 0) {
      suitStr1 += ' |---------| ';
      suitStr2 += ' |---------| ';
      valStr += ' |---------| ';
      continue;
    }
    
    let valuePad = String(cards[idx].val).length + 
    Math.floor((CARD_DISPLAY_SIZE - String(cards[idx].val).length) / 2);

    let suitCode = String.fromCharCode(SUIT_CODES[cards[idx].suit]);

    suitStr1 += ` |${suitCode}        | `;
    suitStr2 += ` |${suitCode}        | `.split('').reverse().join('');
    valStr += ` |${String(cards[idx].val).padStart(valuePad, ' ')
                                         .padEnd(CARD_DISPLAY_SIZE, ' ')}| `;
  
  }
  
  console.log(' +---------+ '.repeat(cards.length));
  console.log(suitStr1);
  console.log(' |         | '.repeat(cards.length));
  console.log(valStr);
  console.log(' |         | '.repeat(cards.length));
  console.log(suitStr2);
  console.log(' +---------+ '.repeat(cards.length));

  return undefined;
}

function displayBoard(playerCards, dealerCards, hideDealer, chips) {
  console.clear();
  displayBalance(chips);
  console.log('DEALER: ');
  displayCards(dealerCards, hideDealer);
  console.log('');
  console.log('');
  console.log('PLAYER: ');
  displayCards(playerCards);
  console.log('');

  return undefined;
} 

function dealCards(playerCards, dealerCards, deck) {
  playerCards.push(getRandomCard(deck), getRandomCard(deck));
  dealerCards.push(getRandomCard(deck), getRandomCard(deck));

  return undefined;
}

function score(someCards) {
  let aces = someCards.filter(card => card.val === 'Ace');
  let notAces = someCards.filter(card => card.val !== 'Ace');

  let score = notAces.reduce((acc, card) => acc + CARD_VALUES[card.val], 0);

  for (let idx = 0; idx < aces.length; idx += 1) {
    if (score + (aces.length - idx) > ACE_MAX_VALUE) {
      score += ACE_MIN_VALUE;
    } else {
      score += ACE_MAX_VALUE;
    }
  }

  return score;
}

function isBust(someScore) {
  return someScore[0] > GAME_LIMIT;
}

function playerTurn(playerCards, dealerCards, deck, chips, playerScore) {
  while(true) {
    console.log('Hit or Stay? (h/s)');
    let answer = readline.question().toLowerCase()[0];

    while (!['h', 's'].includes(answer)) {
      console.log('Input (h/s) to choose your move');
      answer = readline.question().toLowerCase().trim();
    }

    if (answer === 'h') {
      playerCards.push(getRandomCard(deck));
      displayBoard(playerCards, dealerCards, true, chips);
    } else {
      playerScore[0] = score(playerCards);
      break;
    } 

    playerScore[0] = score(playerCards);

    if (isBust(playerScore)) break;
  } 

  return undefined;
}

function dealerTurn(playerCards, dealerCards, deck, dealerScore) {
  dealerScore[0] = score(dealerCards);

  while(dealerScore[0] <= 17) {
    dealerCards.push(getRandomCard(deck));
    dealerScore[0] = score(dealerCards);
  }
  displayBoard(playerCards, dealerCards);

  return undefined;
}

function getWinner(playerScore, dealerScore) {
  let playerFinalScore = playerScore[0];
  let dealerFinalScore = dealerScore[0];

  if (playerFinalScore > dealerFinalScore) {
    return 'player';
  } else if (dealerScore > playerScore){
    return 'dealer';
  } else {
    return 'tie';
  }
}

function getBet(chips) {
  console.log('How many chips do you want to bet?');
  let bet = Number.parseInt(readline.question(), 10);

  while(Number.isNaN(bet)) {
    console.log('Please enter an integer value');
    bet = Number.parseInt(readline.question(), 10);
  }

  while(bet < 1 || chips < bet) {
    console.log(`Not a valid bet. Enter an integer between 1 and ${chips}.`);
    bet = bet = Number.parseInt(readline.question(), 10);
  }

  return bet;
}

function stopGame(chips) {
  console.log('Do you want to play another round? (y/n)');
  let answer = readline.question().toLowerCase().trim();

  while(!['y', 'n'].includes(answer)) {
    console.log("Enter 'y' to play another round or 'n' to stop");
    answer = readline.question().toLowerCase()[0];
  }

  if (answer === 'y') return false;

  return true;
}

/*
GAME
*/
console.clear();

let chips = 10;
console.log('Welcome to Twenty One');


while(true) {
  let player = [];
  let dealer = [];
  let playerScore = [0];
  let dealerScore = [0];

  console.log(`Your current balance is ${chips} chips`);
  let bet = getBet(chips);
  chips -= bet;
  let deck = initializeDeck();
  dealCards(player, dealer, deck);
  displayBoard(player, dealer, true, chips);

  while(true) {
    playerTurn(player, dealer, deck, chips, playerScore);
    if (isBust(playerScore)) {
      console.log('You went bust! Dealer wins!');
      break;
    }

    dealerTurn(player, dealer, deck, dealerScore);
    if (isBust(dealerScore)) {
      chips += (bet * 2);
      displayBoard(player, dealer, false, chips)
      console.log('Dealer went bust! You win!');
      break;
    }

    let winner = getWinner(playerScore, dealerScore);
    

    if (winner === 'player') {
      chips += (bet * 2);
      displayBoard(player, dealer, false, chips);
      console.log(`You scored ${playerScore[0]}. Dealer scored ${dealerScore[0]}`);
      console.log('You win!');
      break;
    } else if (winner === 'dealer') {
      displayBoard(player, dealer, false, chips);
      console.log(`You scored ${playerScore[0]}. Dealer scored ${dealerScore[0]}`); 
      console.log('Dealer wins!');
      break;
    } else {
      chips += bet;
      displayBoard(player, dealer, false, chips);
      console.log(`You scored ${playerScore[0]}. Dealer scored ${dealerScore[0]}`);
      console.log('It is a tie!');
      break;
    }
  }
  
  if (chips <= 0) {
    console.log('You are out of chips! Goodbye!');
    break;
  }

  if (stopGame()) {
    console.log('Goodbye!');
    break;
  }
  
  console.clear();
}





