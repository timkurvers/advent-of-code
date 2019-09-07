#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';

day(12).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.from(input);
  program.run();
  return program.data.a;
});

day(12).part(2).test(examples).feed(puzzleInput).inefficient.solution((input) => {
  const program = Program.from(input);
  program.data.c = 1;
  program.run();
  return program.data.a;
});
