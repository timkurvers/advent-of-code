import { solution } from '../../utils/index.js';

import Program from './Program.js';

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
