// MORTGAGE PAYMENT CALCULATOR

const readline = require('readline-sync');
const messages = require('./mortgage_calculator_messages.json');

prompt(messages.opening);

let loanAmount = getLoanAmount();
let monthlyInterestRate = getLoanMIR();
let loanDurationInMonths = getDuration(getOption());
let monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyInterestRate, loanDurationInMonths);

prompt(`Your monthly payment is: ${monthlyPayment}$`);


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
  return (Number(userInput)/100)/12;
}

function getOption() {
  prompt(messages.whichDuration);
  let userInput = readline.question();
  while(!['1', '2', '3'].includes(userInput)) {
    prompt(messages.notDuration);
    userInput = readline.question();
  }
  return userInput;
}

function getDuration(option) {
  switch (option) {
    case '1':
      return getDurationYears();
    case '2':
      return getDurationYearsMonths();
    case '3':
      return getDurationMonths();
  }
}

function calculateMonthlyPayment(p, j, n) {
  return p * (j / (1 - Math.pow((1 + j), (-n))));
}

// HELPER FUNCTIONS USED IN THIS PROGRAM:

function getDurationYears() {
  prompt(messages.durationYears);
  let userInput = readline.question();
  while(invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question;
  }
  return 12*Number(userInput);
}

function getDurationYearsMonths() {
  prompt(messages.durationMonthsYears);
  prompt(messages.numYears);
  let userInput = readline.question();
  while(invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question;
  }
  prompt(messages.numMonths);
  let secondUserInput = readline.question();
  while(invalidLoanDuration(secondUserInput)) {
    prompt(messages.notLoanDuration);
    secondUserInput = readline.question;
  }
  return 12*Number(userInput) + Number(secondUserInput);
}

function getDurationMonths() {
  prompt(messages.durationMonths);
  let userInput = readline.question();
  while(invalidLoanDuration(userInput)) {
    prompt(messages.notLoanDuration);
    userInput = readline.question();
  }
  return Number(userInput);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function invalidLoan(number) {
  return invalidNumber(number) || Number(number) <= 0;
}

function invalidAPR(number) {
  return invalidNumber(number) || (Number(number) < 0 || Number(number) > 100);
}

function invalidLoanDuration(number) {
  return invalidNumber(number) || Number(number) <= 0;
}



