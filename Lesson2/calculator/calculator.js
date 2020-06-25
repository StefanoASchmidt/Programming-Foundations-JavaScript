const readline = require('readline-sync');
const messages = require('./calculator_messages.json');
let langCode;
let num1;
let num2;
let operation;
let output;

// get user language choice
console.clear();
langCode = getInput("lang", "", verifyLanguage);

// run calculator
while (true) {

  console.clear();

  num1 = getInput("firstNum", langCode, verifyNumber);

  num2 = getInput("secondNum", langCode, verifyNumber);

  operation = getInput("askOp", langCode, verifyOperation);

  if (isValidArithmetic(num2, operation)) {
    output = computeOutput(num1, num2, operation);
    giveResult(output, langCode);
  } else {
    sayBadArithmetic(langCode);
  }

  if (!getContinueProgram(langCode)) break;

}

// functions declared

function getInput(inputType, languageCode, inputVerifyFunction) {
  if (languageCode) {
    sleep(200);
    prompt(messages[languageCode][inputType]);
    let retrievedInput = readline.question();
    retrievedInput = inputVerifyFunction(retrievedInput, languageCode);
    return retrievedInput;
  } else {
    sleep(200);
    prompt(messages[inputType]);
    let retrievedInput = readline.question();
    retrievedInput = inputVerifyFunction(retrievedInput);
    return retrievedInput;
  }
}

function isValidArithmetic(num2, operation) {
  if (num2 === '0' && operation === '4') {
    return false;
  } else {
    return true;
  }
}

function computeOutput(num1, num2, operation) {
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
  return output;
}

function giveResult(result, languageCode) {
  prompt(messages[languageCode].showResult + result);
}

function sayBadArithmetic(languageCode) {
  prompt(messages[languageCode].divideByZero);
}


function getContinueProgram(languageCode) {
  sleep(200);
  prompt(messages[languageCode].contCalc);
  let contProg = readline.question();

  while (!['1', '2'].includes(contProg)) {
    sleep(200);
    prompt(messages[languageCode].invalidContCalc);
    contProg = readline.question();
  }

  if (contProg === '1') {
    return true;
  } else {
    return false;
  }
}

// helper functions

function prompt(message) {
  console.log(`+-*/ ${message}`);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function isInvalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function verifyLanguage(number) {
  while (!['1', '2', '3', '4', '5', '6', '7', '8'].includes(number)) {
    sleep(200);
    prompt(messages.invalidLang);
    number = readline.question();
  }
  return number;
}

function verifyNumber(number, languageCode) {
  let toVerify = number;
  while (isInvalidNumber(toVerify)) {
    sleep(200);
    prompt(messages[languageCode].invalidNum);
    toVerify = readline.question();
  }
  return toVerify;
}

function verifyOperation(number, languageCode) {
  while (!['1', '2', '3', '4'].includes(number)) {
    sleep(200);
    prompt(messages[languageCode].invalidOp);
    number = readline.question();
  }
  return number;
}