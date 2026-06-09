#!/usr/bin/env node
'use strict';

// Node.js CLI Calculator
// Supported operations:
//  - addition: add or +
//  - subtraction: subtract, sub or -
//  - multiplication: multiply, mul, x, X, * or ×
//  - division: divide, div, / or ÷

const args = process.argv.slice(2);

function printUsage() {
  console.log('Usage:');
  console.log('  node src/calculator.js add 2 3');
  console.log("  node src/calculator.js 2 + 3");
  console.log('Supported operators: add, subtract, multiply, divide OR + - * /');
}

function parseAndCompute(aStr, op, bStr) {
  const a = parseFloat(aStr);
  const b = parseFloat(bStr);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Operands must be numbers');
  }

  op = op.toString().toLowerCase();

  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'subtract':
    case 'sub':
    case '-':
      return a - b;
    case 'multiply':
    case 'mul':
    case 'x':
    case '×':
    case '*':
      return a * b;
    case 'divide':
    case 'div':
    case '/':
    case '÷':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error('Unsupported operator: ' + op);
  }
}

try {
  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }

  let result;

  // Two calling styles supported:
  // 1) node src/calculator.js add 2 3
  // 2) node src/calculator.js 2 + 3
  if (args.length === 3) {
    // either (operator operand operand) or (operand operator operand)
    const [p1, p2, p3] = args;

    // detect if first arg is an operator word
    const opNames = ['add','subtract','sub','multiply','mul','divide','div','+','-','*','/','x','×','÷'];
    if (opNames.includes(p1.toLowerCase())) {
      // form: operator a b
      result = parseAndCompute(p2, p1, p3);
    } else if (opNames.includes(p2.toLowerCase())) {
      // form: a operator b
      result = parseAndCompute(p1, p2, p3);
    } else {
      throw new Error('Cannot parse arguments');
    }
  } else {
    throw new Error('Invalid number of arguments');
  }

  console.log(result);
} catch (err) {
  console.error('Error:', err.message);
  printUsage();
  process.exit(1);
}
