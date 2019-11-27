import { day } from '..';
import { sum } from '../../utils';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';

day(19).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const program = new Program(input);
  program.run();
  return program.data[0];
});

day(19).part(2).test(examples).feed(puzzleInput).solution((input) => {
  // Manual analysis: this program calculates the factors of a certain number.
  // Initially, this number is small enough for the routine to complete. When
  // setting register 0 to 1, however, this becomes infeasible to compute.
  const program = new Program(input);
  program.data[0] = 1;

  // Intercept instruction #34 ending the program
  program.intercept(34);
  program.run();

  // Extract number from register 2
  const number = program.data[2];

  // Calculate all factors of extracted number
  const factors = new Set();
  for (let factor = 1; factor <= number; ++factor) {
    if (number % factor === 0) {
      factors.add(factor);
    }
  }

  // After a run, register 0 contains a sum of the factors, so do so manually
  return sum(Array.from(factors));
});
