#!/usr/bin/env node
'use strict';

// CLI wrapper for the calculator library
// Supported operations (delegated to src/lib/calculator.js):
//  - addition: add or +
//  - subtraction: subtract, sub or -
//  - multiplication: multiply, mul, x, X, * or ×
//  - division: divide, div, / or ÷

const { compute } = require('./lib/calculator');
const args = process.argv.slice(2);

function printUsage() {
  console.log('Usage:');
  console.log('  node src/calculator.js add 2 3');
  console.log("  node src/calculator.js 2 + 3");
  console.log('Supported operators: add, subtract, multiply, divide OR + - * /');
}

try {
  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }

  let result;

  if (args.length === 3) {
    const [p1, p2, p3] = args;
    const opNames = ['add','subtract','sub','multiply','mul','divide','div','+','-','*','/','x','×','÷','mod','modulo','%','pow','power','^','**'];
    if (opNames.includes(p1.toLowerCase())) {
      // form: operator a b
      result = compute(p2, p1, p3);
    } else if (opNames.includes(p2.toLowerCase())) {
      // form: a operator b
      result = compute(p1, p2, p3);
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
