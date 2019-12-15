import { wait } from '../../utils';

import Operand from './operations/Operand';
import operations from './operations/lookup';

class IntcodeProgram {
  constructor(source) {
    this.source = source;
    this.reset();

    this.resolve = this.resolve.bind(this);
  }

  reset() {
    this.memory = [...this.source];
    this.pointer = 0;
    this.halt = false;
    this.inputs = [];
    this.outputs = [];
    this.relativeBase = 0;
  }

  override({ noun, verb } = {}) {
    this.reset();
    this.memory[1] = noun;
    this.memory[2] = verb;
  }

  input(value) {
    this.inputs.push(value);
  }

  async output() {
    let value = this.outputs.shift();
    while (value === undefined && !this.halt) {
      await wait();
      value = this.outputs.shift();
    }
    return value;
  }

  read() {
    return this.memory[this.pointer++] || 0;
  }

  resolve(operand, mode) {
    let value = this.read();
    if (mode === 1) {
      return value;
    }
    if (mode === 2) {
      value = this.relativeBase + value;
    }
    if (operand === Operand.VALUE) {
      return this.memory[value] || 0;
    }
    return value;
  }

  async run() {
    while (!this.halt) {
      const int = this.read();
      const opcode = int % 100;
      const modes = int / 100 | 0;
      const operation = operations.get(opcode);
      if (!operation) {
        throw new Error(`Unknown opcode: ${opcode} @ ${this.pointer}`);
      }
      const values = operation.operands.map((operand, index) => {
        const base = 10 ** index;
        const mode = ((modes % (base * 10)) / base) | 0;
        return this.resolve(operand, mode);
      });
      await operation.exec(this, ...values);
    }
  }

  // Diagnostic test by verifying outputs
  test() {
    const diagcode = this.outputs.pop();
    for (const [index, output] of this.outputs.entries()) {
      if (output !== 0) {
        throw new Error(`Diag test failed: ${output} @ ${index}`);
      }
    }
    return diagcode;
  }

  static from(input) {
    const source = input.split(',').map(Number);
    return new this(source);
  }
}

export default IntcodeProgram;
