// MORTGAGE PAYMENT CALCULATOR

const readline = require('readline-sync');
const messages = require('./mortgage_calculator_messages.json');
const PERCENT_TO_RATE = 1 / 100;
const MONTHS_IN_YEAR = 12;

console.clear();

sleep(200);
prompt(messages.opening);

while (true) {

  sleep(500);
  let loanAmount = getLoanAmount();

  sleep(200);
  let monthlyRate = getLoanMIR();

  sleep(200);
  let loanDuration = getDuration();

  sleep(200);
  let monthlyPayment = computeMonthlyPayment(loanAmount, monthlyRate, loanDuration);
  prompt(messages.payment + String(monthlyPayment));

  sleep(200);
  if (stopCalculator()) {
    break;
  }

  sleep(200);
  console.clear();

}


// FUNCTIONS USED IN THIS PROGRAM:

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

function getLoanMIR() {
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
    case '1':
      duration = getDurationYears();
      break;
    case '2':
      duration = getDurationYearsMonths();
      break;
    case '3':
      duration = getDurationMonths();
      break;
  }
  return duration;
}

function computeMonthlyPayment(amount, rate, months) {
  let payment = amount * (rate / (1 - Math.pow((1 + rate), (-months))));
  return payment.toFixed(2);
}

function stopCalculator() {
  let toStop;
  let symbolStop = getStop();
  switch (symbolStop) {
    case '1':
      toStop = false;
      break;
    case '2':
      toStop = true;
      break;
  }
  return toStop;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while(currentDate - date < milliseconds);
}

// HELPER FUNCTIONS USED IN THIS PROGRAM:

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
    userInput = readline.question;
  }
  return Number(userInput) * MONTHS_IN_YEAR;
}

function getDurationYearsMonths() {
  prompt(messages.durationMonthsYears);
  prompt(messages.numYears);
  let userInput = readline.question();
  while (invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question;
  }
  prompt(messages.numMonths);
  let secondUserInput = readline.question();
  while (invalidLoanDuration(secondUserInput)) {
    prompt(messages.notLoanDuration);
    secondUserInput = readline.question;
  }
  return (Number(userInput) * MONTHS_IN_YEAR) + Number(secondUserInput);
}

function getOption() {
  prompt(messages.whichDuration);
  let userInput = readline.question();
  while (!['1', '2', '3'].includes(userInput)) {
    prompt(messages.notDuration);
    userInput = readline.question();
  }
  return userInput;
}

function getStop() {
  prompt(messages.continue);
  let userInput = readline.question();
  while (invalidNumber(userInput) || !['1', '2'].includes(userInput)) {
    prompt(messages.notContinue);
    userInput = readline.question();
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