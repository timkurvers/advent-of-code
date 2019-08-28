/* eslint-disable max-len */

import { cast } from '../../utils';

const DONE = -1;

class Program {
  constructor(instructions, operations, pid = 0) {
    this.instructions = instructions;
    this.operations = operations;

    this.pointer = 0;
    this.pid = pid;
    this.data = {};

    // Part 1
    this.sounds = [];
    this.recoveries = [];

    // Part 2
    this.data.p = this.pid;
    this.sent = [];
    this.inbox = [];
    this.waiting = false;
    this.link = null;

    this.hook = null;
  }

  clone() {
    const clone = new this.constructor(
      this.instructions,
      this.operations,
      this.pid + 1,
    );
    return clone;
  }

  get done() {
    return this.pointer === DONE;
  }

  get stalled() {
    return this.waiting && !this.inbox.length;
  }

  end() {
    this.pointer = DONE;
  }

  ref(ref) {
    if (typeof ref === 'number') {
      return ref;
    }
    let value = this.data[ref];
    if (value === undefined) {
      value = 0;
      this.data[ref] = value;
    }
    return value;
  }

  step() {
    const instruction = this.instructions[this.pointer];
    if (!instruction) {
      this.end();
      return;
    }

    const { opcode, register, value } = instruction;
    const operation = this.operations[opcode];
    operation(this, register, value);

    if (this.hook) {
      this.hook(opcode, register, value);
    }
  }

  run() {
    while (!this.done) {
      this.step();
    }
  }

  static from(input, operations) {
    const instructions = input.split('\n').map((line) => {
      const [opcode, register, value] = line.split(' ');
      return {
        opcode,
        register: cast(register),
        value: cast(value),
      };
    });
    return new this(instructions, operations);
  }
}

export default Program;
