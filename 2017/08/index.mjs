#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';

day(8).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.parse(input);
  program.run();
  return program.currentMaxValue;
});

day(8).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.parse(input);
  program.run();
  return program.maxValue;
});
