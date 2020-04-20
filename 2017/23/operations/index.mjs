/* eslint-disable no-param-reassign */

export { set, mul } from '../../18/operations/base';

// jnz: jumps with an offset of the value of Y, but only if the value of X is not zero.
export const jnz = (program, register, value) => {
  if (program.ref(register) !== 0) {
    program.pointer += program.ref(value);
    return;
  }
  ++program.pointer;
};

// sub: decreases register X by the value of Y.
export const sub = (program, register, value) => {
  program.data[register] = program.ref(register) - program.ref(value);
  ++program.pointer;
};
