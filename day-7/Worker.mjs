class Worker {
  constructor(nr) {
    this.nr = nr;
    this.step = null;
  }

  get idle() {
    return this.step === null;
  }
}

export default Worker;
