/* eslint-disable no-param-reassign */

import operation from '../02/operations/operation';
import { wait } from '../../utils';

export * from '../02/operations';

export const input = operation(3, async (program) => {
  const { memory } = program;
  const target = program.ref();
  while (!program.inputs.length) {
    await wait(1);
  }
  const value = program.inputs.shift();
  memory[target] = value;
});

export const output = operation(4, (program) => {
  const value = program.value();
  program.outputs.push(value);
});

export const jumpIfTrue = operation(5, (program) => {
  const value = program.value();
  const pointer = program.value();
  if (value !== 0) {
    program.pointer = pointer;
  }
});

export const jumpIfFalse = operation(6, (program) => {
  const value = program.value();
  const pointer = program.value();
  if (value === 0) {
    program.pointer = pointer;
  }
});

export const lessThan = operation(7, (program) => {
  const { memory } = program;
  const a = program.value();
  const b = program.value();
  const target = program.ref();
  memory[target] = a < b ? 1 : 0;
});

export const equals = operation(8, (program) => {
  const { memory } = program;
  const a = program.value();
  const b = program.value();
  const target = program.ref();
  memory[target] = a === b ? 1 : 0;
});
