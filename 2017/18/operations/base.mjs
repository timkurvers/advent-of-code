/* eslint-disable max-len, no-param-reassign */

// set: sets register X to the value of Y.
export const set = (program, register, value) => {
  program.data[register] = program.ref(value);
  ++program.pointer;
};

// add: increases register X by the value of Y.
export const add = (program, register, value) => {
  program.data[register] = program.ref(register) + program.ref(value);
  ++program.pointer;
};

// mul: sets register X to the result of multiplying the value contained in register X by the value of Y.
export const mul = (program, register, value) => {
  program.data[register] = program.ref(register) * program.ref(value);
  ++program.pointer;
};

// mod: sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo value).
export const mod = (program, register, value) => {
  program.data[register] = program.ref(register) % program.ref(value);
  ++program.pointer;
};

// jgz: jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
export const jgz = (program, register, value) => {
  if (program.ref(register) > 0) {
    program.pointer += program.ref(value);
    return;
  }
  ++program.pointer;
};
