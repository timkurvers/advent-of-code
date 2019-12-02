class Program {
  constructor(source) {
    this.source = source;
    this.reset();
  }

  reset() {
    this.memory = [...this.source];
  }

  override({ noun, verb } = {}) {
    this.reset();
    this.memory[1] = noun;
    this.memory[2] = verb;
  }

  run() {
    let offset = 0;
    while (true) {
      const {
        [offset]: opcode,
        [offset + 1]: a,
        [offset + 2]: b,
        [offset + 3]: target,
      } = this.memory;

      if (opcode === 99) {
        break;
      }

      if (opcode === 1) {
        this.memory[target] = this.memory[a] + this.memory[b];
      } else if (opcode === 2) {
        this.memory[target] = this.memory[a] * this.memory[b];
      }
      offset += 4;
    }
  }

  static from(input) {
    const source = input.split(',').map(Number);
    return new Program(source);
  }
}

export default Program;
