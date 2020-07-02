// MORTGAGE PAYMENT CALCULATOR

const readline = require('readline-sync');
const messages = require('./mortgage_calculator_messages.json');
const PERCENT_TO_RATE = 1 / 100;
const MONTHS_IN_YEAR = 12;

// FUNCTIONS:
function prompt(string) {
  console.log(`>> ${string}`);
}

function getLoanAmount() {
  prompt(messages.loan);
  let userInput = readline.question();
  while (invalidLoan(userInput)) {
    prompt(messages.notLoan);
    userInput = readline.question();
  }
  return Number(userInput);
}

function getMonthlyRate() {
  prompt(messages.loanAPR);
  let userInput = readline.question();
  while (invalidAPR(userInput)) {
    prompt(messages.notLoanAPR);
    userInput = readline.question();
  }
  return (Number(userInput) * PERCENT_TO_RATE) / MONTHS_IN_YEAR;
}

function getDuration() {
  let duration;
  let option = getOption();
  switch (option) {
    case 'y':
      duration = getDurationYears();
      break;
    case 'ym':
      duration = getDurationYearsMonths();
      break;
    case 'm':
      duration = getDurationMonths();
      break;
  }
  return duration;
}

function computeMonthlyPayment(amount, rate, months) {
  let payment;
  if (rate === 0) {
    payment = amount / months;
  } else {
    payment = amount * (rate / (1 - Math.pow((1 + rate), (-months))));
  }
  return payment.toFixed(2);
}

function stopCalculator() {
  let toStop;
  let symbolStop = getStop();
  switch (symbolStop) {
    case 'y':
      toStop = false;
      break;
    case 'n':
      toStop = true;
      break;
  }
  return toStop;
}

/*
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while(currentDate - date < milliseconds);
}
*/

// HELPER FUNCTIONS:
function getDurationMonths() {
  prompt(messages.durationMonths);
  let userInput = readline.question();
  while (invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question();
  }
  return Number(userInput);
}

function getDurationYears() {
  prompt(messages.durationYears);
  let userInput = readline.question();
  while (invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question();
  }
  return Number(userInput) * MONTHS_IN_YEAR;
}

function getDurationYearsMonths() {
  prompt(messages.durationMonthsYears);
  prompt(messages.numYears);
  let userInput = readline.question();
  while (invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question();
  }
  prompt(messages.numMonths);
  let secondUserInput = readline.question();
  while (invalidLoanDuration(secondUserInput)) {
    prompt(messages.notLoanDuration);
    secondUserInput = readline.question();
  }
  return (Number(userInput) * MONTHS_IN_YEAR) + Number(secondUserInput);
}

function getOption() {
  prompt(messages.whichDuration);
  let userInput = readline.question().trim().toLowerCase();
  while (!['y', 'ym', 'm'].includes(userInput)) {
    prompt(messages.notDuration);
    userInput = readline.question().trim().toLowerCase();
  }
  return userInput;
}

function getStop() {
  prompt(messages.continue);
  let userInput = readline.question().trim().toLowerCase()[0];
  while (!['y', 'n'].includes(userInput)) {
    prompt(messages.notContinue);
    userInput = readline.question().trim().toLowerCase()[0];
  }
  return userInput;
}

function invalidAPR(number) {
  return invalidNumber(number) || (Number(number) < 0 || Number(number) > 100);
}

function invalidLoan(number) {
  return invalidNumber(number) || Number(number) <= 0;
}

function invalidLoanDuration(number) {
  return invalidNumber(number) || Number(number) <= 0;
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

// PROGRAM
console.clear();

prompt(messages.opening);

while (true) {

  let loan = getLoanAmount();

  let rate = getMonthlyRate();

  let duration = getDuration();

  let monthlyPayment = computeMonthlyPayment(loan, rate, duration);
  prompt(messages.payment + String(monthlyPayment));

  if (stopCalculator()) {
    break;
  }

  console.clear();

}