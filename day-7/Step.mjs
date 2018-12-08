const cache = new Map();

class Step {
  constructor(id) {
    this.id = id;
    this.prerequisites = [];

    this.reset();
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

  reset() {
    this.startedAt = null;
    this.completedAt = null;
    this.worker = null;
  }

  static get all() {
    return Array.from(cache.values());
  }

  static for(id) {
    let step = cache.get(id);
    if (!step) {
      step = new this(id);
      cache.set(id, step);
    }
    return step;
  }

  static reset() {
    cache.forEach(step => step.reset());
  }
}

export default Step;
