import { noop } from '../../../utils/index.js';

class Operation {
  constructor(definition) {
    this.opcode = definition.opcode;
    this.operands = definition.operands || [];
    this.exec = definition.exec || noop;
  }
}

export default Operation;
