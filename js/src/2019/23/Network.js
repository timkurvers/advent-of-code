/* eslint-disable consistent-return */

import { range, wait } from '../../utils/index.js';

import Computer from './Computer.js';

class Network extends Array {
  constructor(input, { computerCount = 50, NAT = null } = {}) {
    super();

    for (const id of range({ length: computerCount })) {
      const computer = Computer.from(input);
      computer.input(id);
      this[id] = computer;
    }

    this.NAT = NAT;
  }

  get idle() {
    return this.every((computer) => computer.idle);
  }

  get running() {
    return this.every((computer) => !computer.halt);
  }

  halt() {
    for (const computer of this) {
      computer.halt = true;
    }
  }

  async run() {
    for (const computer of this) {
      computer.run();
    }

    while (this.running) {
      for (const computer of this) {
        if (!computer.inputs.length) {
          computer.input(-1);
        }

        while (computer.outputs.length) {
          const address = await computer.output();
          const x = await computer.output();
          const y = await computer.output();

          const target = this[address] || this.NAT;
          if (!target) {
            this.halt();
            return { address, x, y };
          }
          target.message(x, y);
        }
      }

      if (this.idle && this.NAT) {
        this.NAT.kickstart(this);
      }

      await wait();
    }
  }
}

export default Network;
