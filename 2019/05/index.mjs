import Program from '../02/Program';
import { solution } from '../../utils';

import * as operations from './operations';

export const partOne = solution((input) => {
  const program = Program.from(input, operations);
  program.inputs.push(1);
  program.run();
  return program.test();
});

export const partTwo = solution((input) => {
  const program = Program.from(input, operations);
  program.inputs.push(5);
  program.run();
  return program.test();
});
