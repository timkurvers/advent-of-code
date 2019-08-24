import { Point, flatMap } from '.';

class Grid {
  constructor() {
    this.map = new Map();
  }

  get width() {
    const xs = flatMap(Array.from(this.map.values()), row => (
      Array.from(row.keys())
    ));
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    return maxX - minX;
  }

  get height() {
    const ys = Array.from(this.map.keys());
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return maxY - minY;
  }

  find(condition) {
    for (const [y, row] of this.map.entries()) {
      for (const [x, char] of row.entries()) {
        if (condition(x, y, char, row)) {
          return new Point(x, y);
        }
      }
    }
    return null;
  }

  get(x, y) {
    const row = this.map.get(y);
    return row && row.get(x);
  }

  set(x, y, value = true) {
    let row = this.map.get(y);
    if (!row) {
      row = new Map();
      this.map.set(y, row);
    }
    row.set(x, value);
    return this;
  }

  static from(gfx, { ignoreBlanks = true } = {}) {
    const grid = new this();
    const lines = gfx.split('\n');
    lines.forEach((line, y) => {
      line.split('').forEach((char, x) => {
        if (char === ' ' && ignoreBlanks) {
          return;
        }
        grid.set(x, y, char);
      });
    });
    return grid;
  }
}

export default Grid;
