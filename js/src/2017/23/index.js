/* eslint-disable no-param-reassign */

import Program from '../18/Program.js';
import { solution } from '../../utils/index.js';

import * as operations from './operations/index.js';

const isPrime = (value) => {
  for (let i = 2; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return value > 1;
};

export const partOne = solution((input) => {
  let count = 0;
  const program = Program.from(input, operations);
  program.hook = (opcode) => {
    if (opcode === 'mul') {
      ++count;
    }
  };
  program.run();
  return count;
});

export const partTwo = solution((input) => {
  // Manual analysis: this program calculates the number of non-primes between
  // registers b (exclusive) and c in increments of 17, storing the result in
  // register h. Initially, from 79 (b) to 79 (c), it yields no results as 79
  // itself is a prime.
  //
  // Setting register a to 1 changes this range from 107900 (b) to 124900 (c),
  // making it check ~1000 numbers, which is infeasible to compute using the
  // current implementation.
  //
  // Solution: introduce a prime operation for efficiency.

  // prime: stores in register X whether value Y is a prime.
  const prime = (program, register, value) => {
    const result = isPrime(program.ref(value));
    program.data[register] = +result;
    ++program.pointer;
  };

  const program = Program.from(input, {
    ...operations,
    prime,
  });

  // Calculate whether value in register b is a prime directly
  program.instructions[8] = { opcode: 'prime', register: 'f', value: 'b' };

  // No longer need the original two prime calculation loops, so hop over them
  program.instructions[9] = { opcode: 'jnz', register: 1, value: 15 };

  program.data.a = 1;
  program.run();

  return program.data.h;
});
