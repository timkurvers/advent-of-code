import Program from '../18/Program';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';
import * as operations from './operations';

day(23).part(1).test(examples).feed(puzzleInput).solution((input) => {
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
