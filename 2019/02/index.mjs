/* eslint-disable consistent-return */

import { day } from '..';
import { range } from '../../utils';

import Program from './Program';
import examples from './input/examples';
import puzzleInput from './input';

day(2).part(1).test(examples).feed(puzzleInput).solution((input, isExample) => {
  const program = Program.from(input);
  if (!isExample) {
    program.override({ noun: 12, verb: 2 });
  }
  program.run();
  return program.memory[0];
});

day(2).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.from(input);
  for (const noun of range({ end: 99 })) {
    for (const verb of range({ end: 99 })) {
      program.override({ noun, verb });
      program.run();
      if (program.memory[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
});
