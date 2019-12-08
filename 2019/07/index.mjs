import Program from '../02/Program';
import { permute, solution } from '../../utils';
import * as operations from '../05/operations';

const calculate = async (input, phases, { feedback } = {}) => {
  const programs = [];
  let last = null;
  for (const phase of phases) {
    const program = Program.from(input, operations);
    program.label = programs.length + 1;
    if (last) {
      program.inputs = last.outputs;
    }
    program.inputs.push(phase);
    programs.push(program);
    last = program;
  }

  const first = programs[0];

  // Create feedback loop and restore phase value
  if (feedback) {
    first.inputs = last.outputs;
    first.inputs.push(phases[0]);
  }

  // Initial input value (always 0) for first program
  first.inputs.push(0);

  await Promise.all(programs.map(program => program.run()));
  return last.outputs[0];
};

const simulate = (input, config, options) => {
  const permutations = Array.from(permute(config));
  return Promise.all(
    permutations.map(phases => calculate(input, phases, options)),
  );
};

export const partOne = solution(async (input) => {
  const simulations = await simulate(input, [0, 1, 2, 3, 4]);
  return Math.max(...simulations);
});

export const partTwo = solution(async (input) => {
  const simulations = await simulate(input, [5, 6, 7, 8, 9], { feedback: true });
  return Math.max(...simulations);
});
