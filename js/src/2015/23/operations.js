// hlf r sets register r to half its current value, then continues with the next instruction.
export const hlf = (program, r) => {
  program.data[r] /= 2;
  ++program.pointer;
};

// tpl r sets register r to triple its current value, then continues with the next instruction.
export const tpl = (program, r) => {
  program.data[r] *= 3;
  ++program.pointer;
};

// inc r increments register r, adding 1 to it, then continues with the next instruction.
export const inc = (program, r) => {
  program.data[r] += 1;
  ++program.pointer;
};

// jmp offset is a jump; it continues with the instruction offset away relative to itself.
export const jmp = (program, offset) => {
  program.pointer += offset;
};

// jie r, offset is like jmp, but only jumps if register r is even ("jump if even").
export const jie = (program, r, offset) => {
  const even = program.data[r] % 2 === 0;
  program.pointer += even ? offset : 1;
};

// jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).
export const jio = (program, r, offset) => {
  const one = program.data[r] === 1;
  program.pointer += one ? offset : 1;
};
