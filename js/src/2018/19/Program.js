import colors from 'colors';

import operations from '../16/operations.js';

const Interceptor = {
  HALT: 0,
  CONTINUE: 1,
};

class Program {
  constructor(source) {
    const lines = source.trim().split('\n');
    this.ipbinding = +lines.shift().match(/\d/)[0];
    this.instructions = lines.map((line) => {
      const opname = line.slice(0, 4);
      const operation = operations.find((candidate) => candidate.name === opname);
      const [inputA, inputB, outputC] = line.match(/\d+/g).map(Number);
      return {
        opname,
        operation,
        inputA,
        inputB,
        outputC,
      };
    });

    this.ip = 0;
    this.data = [0, 0, 0, 0, 0, 0];
    this.executions = 0;
    this.debug = false;
  }

  intercept(ip, hook = () => Interceptor.HALT) {
    const original = this.instructions[ip].operation;
    const intercept = (data, inputA, inputB, outputC) => {
      original(data, inputA, inputB, outputC);
      if (hook(data, inputA, inputB, outputC) === Interceptor.HALT) {
        this.data[this.ipbinding] = Infinity;
      }
    };
    intercept.toString = () => original.toString();
    this.instructions[ip].operation = intercept;
  }

  log(operation, preA, preB, inputA, inputB, outputC) {
    const { data, ip, ipbinding } = this;

    const reg = (nr) => (nr === ipbinding ? colors.yellow('[ip]') : colors.gray(`[r${nr}]`));

    let impl = operation.toString().split('\n')[1];
    impl = impl.replace('  data[outputC] = ', `#${ip}: ${operation.name}: ${reg(outputC)} = (`);
    impl = impl.replace('data[inputA]', `${preA} ${reg(inputA)}`);
    impl = impl.replace('data[inputB]', `${preB} ${reg(inputB)}`);
    impl = impl.replace('inputA', inputA);
    impl = impl.replace('inputB', inputB);
    impl = impl.replace(';', `) = ${data[outputC]}`);
    console.log(impl);
  }

  run() {
    const { data, instructions } = this;
    while (true) {
      const instruction = instructions[this.ip];
      if (!instruction) {
        return;
      }

      data[this.ipbinding] = this.ip;
      const { operation, inputA, inputB, outputC } = instruction;
      const preA = data[inputA];
      const preB = data[inputB];
      operation(data, inputA, inputB, outputC);
      if (this.debug) {
        this.log(operation, preA, preB, inputA, inputB, outputC);
      }
      this.ip = data[this.ipbinding];
      this.ip++;
      this.executions++;
    }
  }
}

export default Program;
export { Interceptor };
