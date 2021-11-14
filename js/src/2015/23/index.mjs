import { solution } from '../../utils';

import Program from './Program';

export const partOne = solution((input, { register = 'b' } = {}) => {
  const program = Program.from(input);
  program.run();
  return program.data[register];
});

export const partTwo = solution((input) => {
  const program = Program.from(input);
  program.data.a = 1;
  program.run();
  return program.data.b;
});
