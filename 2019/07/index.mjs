import Program from '../02/Program';
import { day } from '..';
import { permute } from '../../utils';
import * as operations from '../05/operations';

import examples from './input/examples';
import puzzleInput from './input';

const simulate = (input, phases) => {
  const last = phases.reduce((current, phase) => {
    const program = Program.from(input, operations);
    program.inputs.push(phase);
    program.inputs.push(current ? current.outputs[0] : 0);
    program.run();
    return program;
  }, null);

  return last.outputs[0];
};

day(7).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const values = [0, 1, 2, 3, 4];
  const simulations = Array.from(permute(values)).map(phases => (
    simulate(input, phases)
  ));
  return Math.max(...simulations);
});
