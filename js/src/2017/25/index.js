import { solution } from '../../utils/index.js';

import TuringMachine from './TuringMachine.js';

export const finalPart = solution((input) => {
  const machine = TuringMachine.from(input);
  machine.run();
  return machine.checksum;
});
