import { solution } from '../../utils/index.js';

import Program from './Program.js';

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
