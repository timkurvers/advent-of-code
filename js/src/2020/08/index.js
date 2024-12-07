import { solution } from '../../utils/index.js';

import Program from './Program.js';
import * as operations from './operations.js';

const INSTRUCTION_MATCHER = /(.{3}) ([+-]\d+)/g;

const parse = (input) =>
  Array.from(input.trim().matchAll(INSTRUCTION_MATCHER)).map((match) => {
    const opcode = match[1];
    const operation = operations[opcode];
    const value = +match[2];
    return { operation, value };
  });

export const partOne = solution((input) => {
  const instructions = parse(input);
  const program = new Program(instructions);
  program.run();
  return program.accumulator;
});

export const partTwo = solution((input) => {
  const instructions = parse(input);
  const { jmp, nop } = operations;

  // Attempt swapping nop/jmp instructions where applicable
  for (const [index, instruction] of instructions.entries()) {
    const attempt = [...instructions];
    if (instruction.operation === jmp) {
      attempt[index] = { ...instruction, operation: nop };
    } else if (instruction.operation === nop) {
      attempt[index] = { ...instruction, operation: jmp };
    } else {
      continue;
    }

    const program = new Program(attempt);
    program.run();

    // Return as soon as we find a program that is no longer infinitely looping
    if (!program.isInfinite) {
      return program.accumulator;
    }
  }
  return null;
});
