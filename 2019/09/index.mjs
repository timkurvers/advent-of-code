import Program from '../02/Program';
import { solution } from '../../utils';

import * as operations from './operations';

export const partOne = solution(async (input) => {
  const program = Program.from(input, operations);
  program.inputs.push(1);
  await program.run();
  return program.outputs.join(',');
});

export const partTwo = solution(async (input) => {
  const program = Program.from(input, operations);
  program.inputs.push(2);
  await program.run();
  return program.outputs.join(',');
});
