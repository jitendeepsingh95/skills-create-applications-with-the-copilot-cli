const assert = require('assert');
const { execFileSync } = require('child_process');
const calc = require('../lib/calculator');

describe('Calculator library', function() {
  describe('Basic operations', function() {
    it('adds two numbers', function() {
      assert.strictEqual(calc.add(2, 3), 5);
    });

    it('subtracts two numbers', function() {
      assert.strictEqual(calc.subtract(10, 4), 6);
    });

    it('multiplies two numbers', function() {
      assert.strictEqual(calc.multiply(45, 2), 90);
    });

    it('divides two numbers', function() {
      assert.strictEqual(calc.divide(20, 5), 4);
    });

    it('modulo two numbers', function() {
      assert.strictEqual(calc.modulo(10, 3), 1);
      assert.strictEqual(calc.modulo(5, 2), 1);
    });

    it('power function', function() {
      assert.strictEqual(calc.power(2, 3), 8);
      assert.strictEqual(calc.power(4, 0.5), 2);
    });

    it('squareRoot positive', function() {
      assert.strictEqual(calc.squareRoot(9), 3);
      assert.strictEqual(calc.squareRoot(16), 4);
    });

    it('squareRoot negative should throw', function() {
      assert.throws(() => calc.squareRoot(-4), /Square root of negative number/);
    });
  });

  describe('Compute helper', function() {
    it('computes using symbol operator', function() {
      assert.strictEqual(calc.compute('2', '+', '3'), 5);
      assert.strictEqual(calc.compute('10', '-', '4'), 6);
      assert.strictEqual(calc.compute('45', '*', '2'), 90);
      assert.strictEqual(calc.compute('20', '/', '5'), 4);
      assert.strictEqual(calc.compute('10', '%', '3'), 1);
      assert.strictEqual(calc.compute('5', '%', '2'), 1);
      assert.strictEqual(calc.compute('2', '^', '3'), 8);
    });

    it('computes using word operator', function() {
      assert.strictEqual(calc.compute('2', 'add', '3'), 5);
      assert.strictEqual(calc.compute('10', 'subtract', '4'), 6);
      assert.strictEqual(calc.compute('45', 'multiply', '2'), 90);
      assert.strictEqual(calc.compute('20', 'divide', '5'), 4);
      assert.strictEqual(calc.compute('10', 'mod', '3'), 1);
      assert.strictEqual(calc.compute('2', 'power', '3'), 8);
    });

    it('throws on division by zero', function() {
      assert.throws(() => calc.divide(1, 0), /Division by zero/);
      assert.throws(() => calc.compute('1', '/', '0'), /Division by zero/);
      assert.throws(() => calc.compute('1', '%', '0'), /Division by zero/);
    });

    it('throws on non-numeric operands', function() {
      assert.throws(() => calc.compute('a', '+', '2'), /Operands must be numbers/);
    });

    it('throws on unsupported operator', function() {
      assert.throws(() => calc.compute('1', 'unknown', '2'), /Unsupported operator/);
    });
  });
});

describe('CLI behavior', function() {
  function runCli(args) {
    return execFileSync('node', ['src/calculator.js', ...args], { encoding: 'utf8' }).trim();
  }

  it('CLI: 2 + 3', function() {
    assert.strictEqual(runCli(['2', '+', '3']), '5');
  });

  it('CLI: add 2 3', function() {
    assert.strictEqual(runCli(['add', '2', '3']), '5');
  });

  it('CLI: 10 % 3', function() {
    assert.strictEqual(runCli(['10', '%', '3']), '1');
  });

  it('CLI: 5 % 2', function() {
    assert.strictEqual(runCli(['5', '%', '2']), '1');
  });

  it('CLI: 2 ^ 3', function() {
    assert.strictEqual(runCli(['2', '^', '3']), '8');
  });

  it('CLI: division by zero returns non-zero exit', function() {
    let threw = false;
    try {
      runCli(['1', '/', '0']);
    } catch (e) {
      threw = true;
      // ensure error text mentions Division by zero
      assert.match(e.stderr.toString(), /Division by zero/);
    }
    if (!threw) throw new Error('Expected CLI to exit with non-zero on division by zero');
  });
});
