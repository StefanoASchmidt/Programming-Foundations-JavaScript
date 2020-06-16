// Building a calculator
// Outline:
// Ask user for first number
// Ask user for second number
// Ask user for operation 
// Perform operation
// Print result to terminal 

const readline = require('readline-sync');
console.log('Welcome to Calculator!');

console.log('What is the first number?');
let num1 = Number(readline.question());

console.log('What is the second number?')
let num2 = Number(readline.question());

console.log('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();

let output;
if (operation === '1') {
  output = num1 + num2;
} else if (operation === '2') {
  output = num1 - num2;
} else if (operation === '3') {
  output = num1 * num2;
} else if (operation === '4') {
  output = num1 / num2;
}

console.log(`The result is: ${output}`);