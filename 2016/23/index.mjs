import { solution } from '../../utils';

import AssembunnyProgram from '../12/AssembunnyProgram';

export const partOne = solution((input) => {
  const program = AssembunnyProgram.from(input);
  program.data.a = 7;
  program.run();
  return program.data.a;
});
