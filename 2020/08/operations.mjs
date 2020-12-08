/* eslint-disable no-param-reassign */

export const acc = (program, value) => {
  program.accumulator += value;
  ++program.ip;
};

export const nop = (program) => {
  ++program.ip;
};

export const jmp = (program, value) => {
  program.ip += value;
};
