'use strict';

// Calculator library used by CLI and tests
// Supported operations:
//  - addition: add or +
//  - subtraction: subtract, sub or -
//  - multiplication: multiply, mul, x, X, * or ×
//  - division: divide, div, / or ÷

function toNumber(v) {
  const n = Number(v);
  if (Number.isNaN(n)) throw new Error('Operands must be numbers');
  return n;
}

function add(a, b) {
  return toNumber(a) + toNumber(b);
}

function subtract(a, b) {
  return toNumber(a) - toNumber(b);
}

function multiply(a, b) {
  return toNumber(a) * toNumber(b);
}

function divide(a, b) {
  const bn = toNumber(b);
  if (bn === 0) throw new Error('Division by zero');
  return toNumber(a) / bn;
}

function compute(aStr, op, bStr) {
  const opLower = op.toString().toLowerCase();
  switch (opLower) {
    case 'add':
    case '+':
      return add(aStr, bStr);
    case 'subtract':
    case 'sub':
    case '-':
      return subtract(aStr, bStr);
    case 'multiply':
    case 'mul':
    case 'x':
    case '×':
    case '*':
      return multiply(aStr, bStr);
    case 'divide':
    case 'div':
    case '/':
    case '÷':
      return divide(aStr, bStr);
    default:
      throw new Error('Unsupported operator: ' + op);
  }
}


function modulo(a, b) {
  const bn = toNumber(b);
  if (bn === 0) throw new Error('Division by zero');
  return toNumber(a) % bn;
}

function power(a, b) {
  return Math.pow(toNumber(a), toNumber(b));
}

function squareRoot(n) {
  const nn = toNumber(n);
  if (nn < 0) throw new Error('Square root of negative number');
  return Math.sqrt(nn);
}

// extend compute to support modulo and power
function compute(aStr, op, bStr) {
  const opLower = op.toString().toLowerCase();
  switch (opLower) {
    case 'add':
    case '+':
      return add(aStr, bStr);
    case 'subtract':
    case 'sub':
    case '-':
      return subtract(aStr, bStr);
    case 'multiply':
    case 'mul':
    case 'x':
    case '×':
    case '*':
      return multiply(aStr, bStr);
    case 'divide':
    case 'div':
    case '/':
    case '÷':
      return divide(aStr, bStr);
    case 'mod':
    case 'modulo':
    case '%':
      return modulo(aStr, bStr);
    case 'pow':
    case 'power':
    case '^':
    case '**':
      return power(aStr, bStr);
    default:
      throw new Error('Unsupported operator: ' + op);
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, compute };
