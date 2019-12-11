import IntcodeProgram from '../02/IntcodeProgram';
import { solution } from '../../utils';

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
