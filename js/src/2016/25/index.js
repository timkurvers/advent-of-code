import { solution } from '../../utils/index.js';

import AssembunnyProgram from '../12/AssembunnyProgram.js';

const isClockSignal = (signal) => signal.every((value, index) => (
  value === index % 2
));

export const finalPart = solution((input) => {
  let a = 0;
  for (; ; ++a) {
    const program = AssembunnyProgram.from(input);
    program.data.a = a;
    program.run({
      until: () => program.outputs.length > 10,
    });
    if (isClockSignal(program.outputs)) {
      break;
    }
  }
  return a;
});
