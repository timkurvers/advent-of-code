import { sum } from '../../utils/index.js';

const REPORT_MATCHER = /(\w+)\s\((\d+)\)(?:\s->\s(.+))?/;

class Program {
  constructor(id) {
    this.id = id;
    this.weight = null;
    this.children = new Set();
  }

  get imbalance() {
    const children = Array.from(this.children);
    const { length } = children;
    if (length <= 1) {
      return 0;
    }

    const totalWeights = children.map((child) => child.totalWeight);
    for (let i = 0; i < length - 1; ++i) {
      const totalWeight = totalWeights[i];
      if (i === totalWeights.lastIndexOf(totalWeight)) {
        const faultyProgram = children[i];
        const targetTotalWeight = totalWeights[(i + 1) % length];
        const adjustment = targetTotalWeight - totalWeight;
        const targetWeight = faultyProgram.weight + adjustment;
        return { faultyProgram, adjustment, targetWeight };
      }
    }

    return null;
  }

  get isImbalanced() {
    return this.imbalance;
  }

  get parent() {
    return this._parent;
  }

  set parent(parent) {
    if (this._parent) {
      this._parent.children.delete(this);
    }
    this._parent = parent;
    if (this._parent) {
      this._parent.children.add(this);
    }
  }

  get totalWeight() {
    const weights = Array.from(this.children).map((child) => child.totalWeight);
    return this.weight + sum(weights);
  }

  static parse(input) {
    const cache = new Map();

    const lookup = (id) => {
      let program = cache.get(id);
      if (!program) {
        program = new this(id);
        cache.set(id, program);
      }
      return program;
    };

    const reports = input.trim().split('\n');
    for (const report of reports) {
      const [, id, weight, children] = report.match(REPORT_MATCHER);
      const current = lookup(id);
      current.weight = +weight;
      if (children) {
        for (const childID of children.split(', ')) {
          lookup(childID).parent = current;
        }
      }
    }

    const programs = Array.from(cache.values());
    const root = programs.find((program) => !program.parent);
    return { programs, root };
  }
}

export default Program;
