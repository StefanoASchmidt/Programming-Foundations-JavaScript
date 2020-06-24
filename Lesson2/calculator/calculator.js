// initialization of program
const readline = require('readline-sync');
const messages = require('./calculator_messages.json');
let cont = '1';

// ask user for language
prompt(messages.lang);
let langCode = readline.question();

while (!['1', '2', '3', '4', '5', '6', '7', '8'].includes(langCode)) {
  prompt(messages.invalidLang);
  langCode = readline.question();
}

prompt(messages[langCode].greeting);
while (cont === '1') {
  // obtain first number
  prompt(messages[langCode].firstNum);
  let num1 = readline.question();

  while (invalidNumber(num1)) {
    prompt(messages[langCode].invalidNum);
    num1 = readline.question();
  }

  // obtain second number
  prompt(messages[langCode].secondNum);
  let num2 = readline.question();

  while (invalidNumber(num2)) {
    prompt(messages[langCode].invalidNum);
    num2 = readline.question();
  }

  // obtain operation
  prompt(messages[langCode].askOp);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages[langCode].invalidOp);
    operation = readline.question();
  }

  // compute output as function of operation
  let output;
  switch (operation) {
    case '1':
      output = Number(Number(num1) + Number(num2)).toFixed(2);
      break;
    case '2':
      output = Number(Number(num1) - Number(num2)).toFixed(2);
      break;
    case '3':
      output = Number(Number(num1) * Number(num2)).toFixed(2);
      break;
    case '4':
      output = Number(Number(num1) / Number(num2)).toFixed(2);
      break;
  }

  prompt(messages[langCode].showResult + output);

  // revaluate condtion to keep program running/looping
  prompt(messages[langCode].contCalc);
  cont = readline.question();

  while (!['1', '2'].includes(cont)) {
    prompt(messages[langCode].invalidContCalc);
    cont = readline.question();
  }
}

// functions declared
function prompt(message) {
  console.log(`+-*/ ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}