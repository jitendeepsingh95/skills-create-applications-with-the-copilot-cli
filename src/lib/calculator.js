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

module.exports = { add, subtract, multiply, divide, compute };
