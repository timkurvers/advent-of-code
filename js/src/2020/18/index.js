/* eslint-disable no-cond-assign */

import { solution, sum } from '../../utils/index.js';

const DIGIT_MATCHER = /\d+/;

const operators = {
  '+': {
    precedence: 2,
    fn: (a, b) => a + b,
  },
  '*': {
    precedence: 1,
    fn: (a, b) => a * b,
  },
};

// Produces Reverse Polish Notation for given line using the Shunting Yard algorithm
// See: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
const sya = (line, { usePrecedence = false }) => {
  const opstack = [];
  const rpn = [];
  const peek = () => opstack[opstack.length - 1];

  for (const char of line) {
    if (char.match(DIGIT_MATCHER)) {
      rpn.push(+char);
    } else if (char in operators) {
      let top = null;
      while (
        (top = peek()) &&
        top in operators &&
        (!usePrecedence || operators[top].precedence > operators[char].precedence)
      ) {
        rpn.push(opstack.pop());
      }
      opstack.push(char);
    } else if (char === '(') {
      opstack.push(char);
    } else if (char === ')') {
      while (peek() !== '(') {
        rpn.push(opstack.pop());
      }
      if (peek() === '(') {
        opstack.pop();
      }
    }
  }
  while (peek()) {
    rpn.push(opstack.pop());
  }
  return rpn;
};

const parse = (input, { usePrecedence } = {}) =>
  input
    .trim()
    .split('\n')
    .map((line) => sya(line, { usePrecedence }));

// Executes given Reverse Polish Notation and returns the remaining stack value
const execute = (rpn) => {
  const stack = [];
  for (const entry of rpn) {
    if (entry in operators) {
      const [a, b] = [stack.pop(), stack.pop()];
      const { fn } = operators[entry];
      const result = fn(a, b);
      stack.push(result);
    } else {
      stack.push(entry);
    }
  }
  return stack[stack.length - 1];
};

export const partOne = solution((input) => {
  const rpns = parse(input);
  return sum(rpns.map(execute));
});

export const partTwo = solution((input) => {
  const rpns = parse(input, { usePrecedence: true });
  return sum(rpns.map(execute));
});
