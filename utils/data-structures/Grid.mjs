import { Point, flatMap } from '.';

class Grid {
  constructor() {
    this.map = new Map();
  }

  get center() {
    const { width, height } = this;
    return new Point(Math.floor(width / 2), Math.floor(height / 2));
  }

  get xs() {
    return flatMap(Array.from(this.map.values()), row => (
      Array.from(row.keys())
    ));
  }

  get ys() {
    return Array.from(this.map.keys());
  }

  get minX() {
    return Math.min(...this.xs);
  }

  get maxX() {
    return Math.max(...this.xs);
  }

  get minY() {
    return Math.min(...this.ys);
  }

  get maxY() {
    return Math.max(...this.ys);
  }

  get width() {
    return this.maxX - this.minX;
  }

  get height() {
    return this.maxY - this.minY;
  }

  filter(condition) {
    const filtered = [];
    for (const [y, row] of this.map.entries()) {
      for (const [x, char] of row.entries()) {
        const point = new Point(x, y);
        if (condition(point, char, row)) {
          filtered.push(point);
        }
      }
    }
    return filtered;
  }

  find(condition) {
    for (const [y, row] of this.map.entries()) {
      for (const [x, char] of row.entries()) {
        const point = new Point(x, y);
        if (condition(point, char, row)) {
          return point;
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
