/* eslint-disable no-param-reassign */

import operation from '../02/operations/operation';
import { wait } from '../../utils';

export * from '../02/operations';

export const input = operation(3, async (program) => {
  const { memory } = program;
  const target = program.read();
  while (!program.inputs.length) {
    await wait(10);
  }
  const value = program.inputs.shift();
  memory[target] = value;
});

export const output = operation(4, (program) => {
  const value = program.resolve();
  program.outputs.push(value);
});

export const jumpIfTrue = operation(5, (program) => {
  const value = program.resolve();
  const target = program.resolve();
  if (value !== 0) {
    program.pointer = target;
  }
});

export const jumpIfFalse = operation(6, (program) => {
  const value = program.resolve();
  const target = program.resolve();
  if (value === 0) {
    program.pointer = target;
  }
});

export const lessThan = operation(7, (program) => {
  const { memory } = program;
  const a = program.resolve();
  const b = program.resolve();
  const target = program.read();
  memory[target] = a < b ? 1 : 0;
});

export const equals = operation(8, (program) => {
  const { memory } = program;
  const a = program.resolve();
  const b = program.resolve();
  const target = program.read();
  memory[target] = a === b ? 1 : 0;
});
