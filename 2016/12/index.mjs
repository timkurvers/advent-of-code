import { solution } from '../../utils';

import Program from './Program';

export const partOne = solution((input) => {
  const program = Program.from(input);
  program.run();
  return program.data.a;
});

export const partTwo = solution.inefficient((input) => {
  const program = Program.from(input);
  program.data.c = 1;
  program.run();
  return program.data.a;
});
