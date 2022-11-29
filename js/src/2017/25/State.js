class State {
  constructor(id) {
    this.id = id;
    this.branches = new Map();
  }

  branch(condition, write, move, next) {
    const branch = {
      condition: +condition,
      write: +write,
      direction: move === 'left' ? -1 : 1,
      next,
    };
    this.branches.set(branch.condition, branch);
  }
}

export default State;
