#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';
import * as operationsWithMessaging from './operations/with-messaging';
import * as operationsWithSounds from './operations/with-sounds';

day(18).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.from(input, operationsWithSounds);
  program.run();
  return program.recoveries[0];
});

day(18).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const program1 = Program.from(input, operationsWithMessaging);
  const program2 = program1.clone();

  program1.link = program2;
  program2.link = program1;

  while (!program1.done && !program2.done) {
    if (program1.waiting && program2.waiting) {
      break;
    }
    program1.step();
    program2.step();
  }

  return program2.sent.length;
});
