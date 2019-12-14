const noop = () => {};

class Operation {
  constructor(definition) {
    this.opcode = definition.opcode;
    this.operands = definition.operands || [];
    this.exec = definition.exec || noop;
  }
}

export default Operation;
