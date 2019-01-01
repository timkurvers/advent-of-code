const INSTRUCTION_MATCHER = /(\w+) (inc|dec) (-?\d+) if (\w+) ([<>=!]{1,2}) (-?\d+)/;

class Program {
  constructor(instructions) {
    this.instructions = instructions;
    this.data = {};
    this.maxValue = null;
  }

  get currentMaxValue() {
    return Math.max(...Object.values(this.data));
  }

  lookup(register) {
    if (!(register in this.data)) {
      this.data[register] = 0;
    }
    return this.data[register];
  }

  run() {
    for (const instruction of this.instructions) {
      const { target, adjustment, condition } = instruction;
      const current = this.lookup(condition.target);
      switch (condition.operator) {
        case '>':
          if (current <= condition.value) continue;
          break;
        case '<':
          if (current >= condition.value) continue;
          break;
        case '>=':
          if (current < condition.value) continue;
          break;
        case '<=':
          if (current > condition.value) continue;
          break;
        case '==':
          if (current !== condition.value) continue;
          break;
        case '!=':
          if (current === condition.value) continue;
          break;
        default:
          throw new Error(`Unsupported operator ${condition.operator}`);
      }
      this.data[target] = this.lookup(target) + adjustment;
      this.maxValue = Math.max(this.maxValue, this.currentMaxValue);
    }
  }

  static parse(input) {
    const instructions = input.split('\n').map((line) => {
      const match = line.match(INSTRUCTION_MATCHER);
      const adjustment = +match[3] * (match[2] === 'inc' ? 1 : -1);
      return {
        target: match[1],
        adjustment,
        condition: {
          target: match[4],
          operator: match[5],
          value: +match[6],
        },
      };
    });
    return new this(instructions);
  }
}

export default Program;
