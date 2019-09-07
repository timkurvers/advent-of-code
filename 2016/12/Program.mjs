import * as operations from './operations';

class Program {
  constructor(instructions) {
    this.instructions = instructions;
    this.pointer = 0;
    this.data = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };
  }

  run() {
    while (true) {
      const { instructions, pointer } = this;

      const instruction = instructions[pointer];
      if (!instruction) {
        break;
      }

      const { opcode, x, y } = instruction;
      const operation = operations[opcode];
      operation(this, x, y);
    }
  }

  static from(input) {
    const instructions = input.split('\n').map((line) => {
      const [opcode, x, y] = line.split(' ');
      return { opcode, x, y };
    });
    return new this(instructions);
  }
}

export default Program;
