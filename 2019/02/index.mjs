/* eslint-disable consistent-return */

import { range, solution } from '../../utils';

import IntcodeProgram from './IntcodeProgram';

export const partOne = solution(async (input, { override = true }) => {
  const program = IntcodeProgram.from(input);
  if (override) {
    program.override({ noun: 12, verb: 2 });
  }
  await program.run();
  return program.memory[0];
});

export const partTwo = solution(async (input) => {
  const program = IntcodeProgram.from(input);
  for (const noun of range({ end: 99 })) {
    for (const verb of range({ end: 99 })) {
      program.override({ noun, verb });
      await program.run();
      if (program.memory[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
});
