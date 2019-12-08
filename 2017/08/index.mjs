import { solution } from '../../utils';

import Program from './Program';

export const partOne = solution((input) => {
  const program = Program.parse(input);
  program.run();
  return program.currentMaxValue;
});

export const partTwo = solution((input) => {
  const program = Program.parse(input);
  program.run();
  return program.maxValue;
});
