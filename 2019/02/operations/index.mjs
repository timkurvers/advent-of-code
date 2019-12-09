/* eslint-disable no-param-reassign */

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
