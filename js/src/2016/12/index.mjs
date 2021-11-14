import { solution } from '../../utils';

import AssembunnyProgram from './AssembunnyProgram';

export const partOne = solution((input) => {
  const program = AssembunnyProgram.from(input);
  program.run();
  return program.data.a;
});

export const partTwo = solution.inefficient((input) => {
  const program = AssembunnyProgram.from(input);
  program.data.c = 1;
  program.run();
  return program.data.a;
});
