import Program from '../18/Program';
import { solution } from '../../utils';

import * as operations from './operations';

export const partOne = solution((input) => {
  let count = 0;
  const program = Program.from(input, operations);
  program.hook = (opcode) => {
    if (opcode === 'mul') {
      ++count;
    }
  };
  program.run();
  return count;
});
