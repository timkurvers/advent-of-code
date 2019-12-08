import { solution } from '../../utils';

import Program from './Program';
import * as operationsWithMessaging from './operations/with-messaging';
import * as operationsWithSounds from './operations/with-sounds';

export const partOne = solution((input) => {
  const program = Program.from(input, operationsWithSounds);
  program.run();
  return program.recoveries[0];
});

export const partTwo = solution((input) => {
  const program1 = Program.from(input, operationsWithMessaging);
  const program2 = program1.clone();

  program1.link = program2;
  program2.link = program1;

  while (!program1.done && !program2.done) {
    if (program1.waiting && program2.waiting) {
      break;
    }
    program1.step();
    program2.step();
  }

  return program2.sent.length;
});
