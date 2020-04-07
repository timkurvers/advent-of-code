import { solution } from '../../utils';

import AssembunnyProgram from '../12/AssembunnyProgram';

const isClockSignal = (signal) => signal.every((value, index) => (
  value === index % 2
));

export default solution((input) => {
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
