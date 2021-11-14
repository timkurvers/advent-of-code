/* eslint-disable no-cond-assign */

import { sum } from '../../utils';

class Planet {
  constructor(id) {
    this.id = id;
    this._parent = null;
    this.children = new Set();
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

  get connections() {
    return [this.parent, ...this.children].filter(Boolean);
  }

  get orbits() {
    let orbits = 0;
    let current = this;
    while (current = current.parent) {
      ++orbits;
    }
    return orbits;
  }

  get totalOrbits() {
    return this.orbits + sum(
      Array.from(this.children).map((child) => child.totalOrbits),
    );
  }
}

export default Planet;
