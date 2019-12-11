/* eslint-disable no-param-reassign */

import { wait } from '../../../utils';

import operation from './operation';

export const halt = operation(99, (program) => {
  program.halt = true;
});

export const add = operation(1, (program) => {
  const { memory } = program;
  const a = program.value();
  const b = program.value();
  const target = program.ref();
  memory[target] = a + b;
});

export const multiply = operation(2, (program) => {
  const { memory } = program;
  const a = program.value();
  const b = program.value();
  const target = program.ref();
  memory[target] = a * b;
});

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

export const adjustRelativeBase = operation(9, (program) => {
  const value = program.value();
  program.relativeBase += value;
});
