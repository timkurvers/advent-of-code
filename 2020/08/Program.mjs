class Program {
  constructor(instructions) {
    this.ip = 0;
    this.accumulator = 0;
    this.instructions = instructions;
    this.seen = {};
    this.isInfinite = false;
  }

  get eof() {
    return this.ip >= this.instructions.length;
  }

  run() {
    while (true) {
      if (this.seen[this.ip]) {
        this.isInfinite = true;
        break;
      }
      if (this.eof) {
        break;
      }
      this.seen[this.ip] = true;
      const instruction = this.instructions[this.ip];
      const { operation, value } = instruction;
      operation(this, value);
    }
  }
}

export default Program;
