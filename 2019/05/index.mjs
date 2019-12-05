import Program from '../02/Program';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';
import * as operations from './operations';

day(5).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.from(input, operations);
  program.inputs.push(1);
  program.run();
  return program.test();
});

day(5).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const program = Program.from(input, operations);
  program.inputs.push(5);
  program.run();
  return program.test();
});
