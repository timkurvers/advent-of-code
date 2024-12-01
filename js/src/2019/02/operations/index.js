/* eslint-disable no-param-reassign */

import { wait } from '../../../utils/index.js';

import Operand from './Operand.js';
import Operation from './Operation.js';

export const halt = new Operation({
  opcode: 99,
  exec: (program) => {
    program.halt = true;
  },
});

export const add = new Operation({
  opcode: 1,
  operands: [Operand.VALUE, Operand.VALUE, Operand.ADDRESS],
  exec: (program, a, b, target) => {
    program.memory[target] = a + b;
  },
});

export const multiply = new Operation({
  opcode: 2,
  operands: [Operand.VALUE, Operand.VALUE, Operand.ADDRESS],
  exec: (program, a, b, target) => {
    program.memory[target] = a * b;
  },
});

export const input = new Operation({
  opcode: 3,
  operands: [Operand.ADDRESS],
  exec: async (program, target) => {
    while (!program.inputs.length && !program.halt) {
      await wait();
    }
    const value = program.inputs.shift();
    program.memory[target] = value;
  },
});

export const output = new Operation({
  opcode: 4,
  operands: [Operand.VALUE],
  exec: (program, value) => {
    program.outputs.push(value);
  },
});

export const jumpIfTrue = new Operation({
  opcode: 5,
  operands: [Operand.VALUE, Operand.VALUE],
  exec: (program, value, pointer) => {
    if (value !== 0) {
      program.pointer = pointer;
    }
  },
});

export const jumpIfFalse = new Operation({
  opcode: 6,
  operands: [Operand.VALUE, Operand.VALUE],
  exec: (program, value, pointer) => {
    if (value === 0) {
      program.pointer = pointer;
    }
  },
});

export const lessThan = new Operation({
  opcode: 7,
  operands: [Operand.VALUE, Operand.VALUE, Operand.ADDRESS],
  exec: (program, a, b, target) => {
    program.memory[target] = a < b ? 1 : 0;
  },
});

export const equals = new Operation({
  opcode: 8,
  operands: [Operand.VALUE, Operand.VALUE, Operand.ADDRESS],
  exec: (program, a, b, target) => {
    program.memory[target] = a === b ? 1 : 0;
  },
});

export const adjustRelativeBase = new Operation({
  opcode: 9,
  operands: [Operand.VALUE],
  exec: (program, value) => {
    program.relativeBase += value;
  },
});
