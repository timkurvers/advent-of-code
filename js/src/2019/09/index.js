import IntcodeProgram from '../02/IntcodeProgram.js';
import { solution } from '../../utils/index.js';

export const partOne = solution(async (input) => {
  const program = IntcodeProgram.from(input);
  program.input(1);
  await program.run();
  return program.outputs.join(',');
});

export const partTwo = solution(async (input) => {
  const program = IntcodeProgram.from(input);
  program.input(2);
  await program.run();
  return program.outputs.join(',');
});
