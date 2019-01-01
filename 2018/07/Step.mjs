const INSTRUCTION_MATCHER = /Step (\w) .+ step (\w)/i;

class Step {
  constructor(id) {
    this.id = id;
    this.prerequisites = [];

    this.startedAt = null;
    this.completedAt = null;
    this.worker = null;
  }

  get completed() {
    return this.completedAt !== null;
  }

  get duration() {
    return this.id.charCodeAt(0) - 64;
  }

  get eligible() {
    return !this.started
           && this.prerequisites.every(step => step.completed);
  }

  get started() {
    return this.startedAt !== null;
  }

  start(seconds, worker) {
    this.startedAt = seconds;
    this.worker = worker;
    this.worker.step = this;
  }

  complete(seconds) {
    this.completedAt = seconds;
    this.worker.step = null;
    this.worker = null;
  }

  static from(input) {
    const cache = new Map();

    const lookup = (id) => {
      let step = cache.get(id);
      if (!step) {
        step = new this(id);
        cache.set(id, step);
      }
      return step;
    };

    input.split('\n').forEach((instruction) => {
      const [, prequisite, id] = instruction.match(INSTRUCTION_MATCHER);
      lookup(id).prerequisites.push(lookup(prequisite));
    });

    return Array.from(cache.values());
  }
}

export default Step;
