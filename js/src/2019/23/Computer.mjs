import IntcodeProgram from '../02/IntcodeProgram';

class Computer extends IntcodeProgram {
  get idle() {
    return this.inputs.every((input) => input === -1);
  }

  message(x, y) {
    this.inputs.push(x, y);
  }
}

export default Computer;
