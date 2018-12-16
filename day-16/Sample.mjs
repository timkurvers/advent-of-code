import operations from './operations';

const DEFINITION_REGEXP = /\d+/g;

class Sample {
  constructor(definition) {
    const numbers = definition.match(DEFINITION_REGEXP).map(Number);
    this.before = numbers.slice(0, 4);
    [this.opcode, this.inputA, this.inputB, this.outputC] = numbers.slice(4, 8);
    this.after = numbers.slice(8);
  }

  probe() {
    return operations.filter((operation) => {
      const data = [].concat(this.before);
      operation(data, this.inputA, this.inputB, this.outputC);
      return data.toString() === this.after.toString();
    });
  }
}

export default Sample;
