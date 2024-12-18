import { sum } from '../../utils/index.js';

class Group {
  constructor(level) {
    this.level = level;
    this.children = [];
  }

  get score() {
    return this.level + sum(this.children.map((child) => child.score));
  }
}

export default Group;
