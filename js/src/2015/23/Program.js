import { cast } from '../../utils';

import * as operations from './operations';

const INSTRUCTION_MATCHER = /(\w+) ([-+ab0-9]+)(?:, ([-+ab0-9]+))?/g;

class Program {
  constructor(instructions) {
    this.instructions = instructions;
    this.pointer = 0;
    this.data = {
      a: 0,
      b: 0,
    };
  }

  run() {
    while (true) {
      const { instructions, pointer } = this;

      const instruction = instructions[pointer];
      if (!instruction) {
        break;
      }

      const { opcode, a, b } = instruction;
      const operation = operations[opcode];
      operation(this, a, b);
    }
  }

  static from(input) {
    const matches = Array.from(input.matchAll(INSTRUCTION_MATCHER));
    const instructions = matches.map((match) => {
      const [, opcode, a, b] = match;
      return { opcode, a: cast(a), b: cast(b) };
    });
    return new this(instructions);
  }
}

export default Program;
