import { solution } from '../../utils/index.js';

import AssembunnyProgram from '../12/AssembunnyProgram.js';

export const partOne = solution((input) => {
  const program = AssembunnyProgram.from(input);
  program.data.a = 7;
  program.run();
  return program.data.a;
});

export const partTwo = solution(
  () =>
    // Manually converted Assembunny instructions to loop-based JavaScript,
    // which provided the answer in ~1200ms
    479009263,
);
