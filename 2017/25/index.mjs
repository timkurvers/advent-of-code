import { solution } from '../../utils';

import TuringMachine from './TuringMachine';

export default solution((input) => {
  const machine = TuringMachine.from(input);
  machine.run();
  return machine.checksum;
});
