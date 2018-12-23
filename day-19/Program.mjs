import operations from '../day-16/operations';

class Program {
  constructor(source) {
    const lines = source.split('\n');
    this.ipbinding = +lines.shift().match(/\d/)[0];
    this.instructions = lines.map((line) => {
      const opname = line.slice(0, 4);
      const operation = operations.find(candidate => candidate.name === opname);
      const [inputA, inputB, outputC] = line.match(/\d+/g).map(Number);
      return {
        opname, operation, inputA, inputB, outputC,
      };
    });

    this.ip = 0;
    this.data = [0, 0, 0, 0, 0, 0];
  }

  run() {
    const { data, instructions } = this;
    while (true) {
      const instruction = instructions[this.ip];
      if (!instruction) {
        return;
      }

      data[this.ipbinding] = this.ip;
      const {
        operation, inputA, inputB, outputC,
      } = instruction;
      operation(data, inputA, inputB, outputC);
      this.ip = data[this.ipbinding];
      this.ip++;
    }
  }
}

export default Program;
