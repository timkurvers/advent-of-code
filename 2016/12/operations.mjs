/* eslint-disable no-param-reassign */

const resolve = (program, value) => (
  value in program.data ? program.data[value] : +value
);

// cpy x y: copies x (either an int or the value of a register) into register y.
export const cpy = (program, x, y) => {
  program.data[y] = resolve(program, x);
  ++program.pointer;
};

// inc x: increases the value of register x by one.
export const inc = (program, x) => {
  program.data[x]++;
  ++program.pointer;
};

// dec x: decreases the value of register x by one.
export const dec = (program, x) => {
  program.data[x]--;
  ++program.pointer;
};

// jnz x y: jumps to an instruction y away, but only if x is not zero.
export const jnz = (program, x, y) => {
  const value = resolve(program, x);
  if (value !== 0) {
    program.pointer += resolve(program, y);
  } else {
    ++program.pointer;
  }
};

// tgl x: toggles the instruction x away
export const tgl = (program, x) => {
  const offset = program.pointer + resolve(program, x);
  const operation = program.instructions[offset];

  if (operation) {
    if (operation.y === undefined) {
      operation.opcode = operation.opcode === 'inc' ? 'dec' : 'inc';
    } else {
      operation.opcode = operation.opcode === 'jnz' ? 'cpy' : 'jnz';
    }
  }

  ++program.pointer;
};
