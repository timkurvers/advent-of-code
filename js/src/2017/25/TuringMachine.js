import State from './State.js';

class TuringMachine {
  constructor(stateId, numSteps, states) {
    this.stateId = stateId;
    this.numSteps = +numSteps;
    this.states = states.reduce((map, state) => {
      map.set(state.id, state);
      return map;
    }, new Map());

    this.tape = new Map();
    this.cursor = 0;
  }

  get checksum() {
    return Array.from(this.tape.values()).filter((val) => val === 1).length;
  }

  get state() {
    return this.states.get(this.stateId);
  }

  get value() {
    return this.tape.get(this.cursor) || 0;
  }

  set value(value) {
    this.tape.set(this.cursor, value);
  }

  run() {
    const { numSteps } = this;
    for (let step = 1; step <= numSteps; ++step) {
      const {
        state: { branches },
        value,
      } = this;

      const branch = branches.get(value);
      this.value = branch.write;
      this.cursor += branch.direction;
      this.stateId = branch.next;
    }
  }

  static from(blueprint) {
    const [stateId, numSteps, ...stateDefs] = blueprint.match(/[A-Z]\b|\d+|right|left/g);

    const states = [];
    while (stateDefs.length) {
      const state = new State(stateDefs.shift());
      state.branch(...stateDefs.splice(0, 4));
      state.branch(...stateDefs.splice(0, 4));
      states.push(state);
    }

    const machine = new this(stateId, numSteps, states);
    return machine;
  }
}

export default TuringMachine;
