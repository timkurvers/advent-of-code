import Point from './Point.js';

class Grid {
  constructor({ pointClass = Point } = {}) {
    this.rows = new Map();
    this.pointClass = pointClass;
  }

  get center() {
    const {
      minX, maxX, minY, maxY,
    } = this;
    const x = minX + Math.floor((maxX - minX) / 2);
    const y = minY + Math.floor((maxY - minY) / 2);
    return this.getPoint(x, y);
  }

  get xs() {
    const xs = new Set();
    for (const [, row] of this.rows) {
      for (const x of row.keys()) {
        xs.add(x);
      }
    }
    return Array.from(xs);
  }

  get ys() {
    return Array.from(this.rows.keys());
  }

  get minX() {
    const { xs } = this;
    return xs.length ? Math.min(...xs) : undefined;
  }

  get maxX() {
    const { xs } = this;
    return xs.length ? Math.max(...xs) : undefined;
  }

  get minY() {
    const { ys } = this;
    return ys.length ? Math.min(...ys) : undefined;
  }

  get maxY() {
    const { ys } = this;
    return ys.length ? Math.max(...ys) : undefined;
  }

  get width() {
    const { minX, maxX } = this;
    return minX !== undefined ? maxX - minX + 1 : 0;
  }

  get height() {
    const { minY, maxY } = this;
    return minY !== undefined ? maxY - minY + 1 : 0;
  }

  get points() {
    return this.map((point) => point);
  }

  get values() {
    return this.map((point) => point.value);
  }

  [Symbol.iterator]() {
    const { points } = this;
    let index = 0;
    return {
      next() {
        const point = points[index++];
        return {
          value: point,
          done: !point,
        };
      },
    };
  }

  map(callback) {
    const mapped = [];
    for (const [y, row] of this.rows.entries()) {
      for (const [x, point] of row.entries()) {
        mapped.push(callback(point, x, y));
      }
    }
    return mapped;
  }

  fill(minX, minY, maxX, maxY, value) {
    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        this.set(x, y, value);
      }
    }
  }

  filter(condition) {
    const filtered = [];
    for (const [y, row] of this.rows.entries()) {
      for (const [x, point] of row.entries()) {
        if (condition(point, x, y)) {
          filtered.push(point);
        }
      }
    }
    return filtered;
  }

  find(condition) {
    for (const [y, row] of this.rows.entries()) {
      for (const [x, point] of row.entries()) {
        if (condition(point, x, y)) {
          return point;
        }
      }
    }
    return null;
  }

  get(x, y) {
    const point = this.getPoint(x, y);
    return point && point.value;
  }

  getPoint(x, y) {
    const row = this.rows.get(y);
    return row && row.get(x);
  }

  remove(x, y) {
    const point = this.getPoint(x, y);
    if (point) {
      const row = this.rows.get(y);
      row.delete(x);
      if (!row.size) {
        this.rows.delete(y);
      }
    }
    return point;
  }

  set(x, y, value = true) {
    const { rows, pointClass: PointClass } = this;
    let row = rows.get(y);
    if (!row) {
      row = new Map();
      rows.set(y, row);
    }
    let point = row.get(x);
    if (!point) {
      point = new PointClass(this, x, y);
      row.set(x, point);
    }
    point.value = value;
    return point;
  }

  setPoint(x, y, point) {
    const { rows } = this;
    let row = rows.get(y);
    if (!row) {
      row = new Map();
      rows.set(y, row);
    }
    row.set(x, point);
    return point;
  }

  column(x) {
    const { minY, maxY } = this;
    const column = [];
    for (let y = minY; y <= maxY; ++y) {
      column.push(this.get(x, y));
    }
    return column;
  }

  row(y) {
    const { minX, maxX } = this;
    const row = [];
    for (let x = minX; x <= maxX; ++x) {
      row.push(this.get(x, y));
    }
    return row;
  }

  // Flips this grid horizontally keeping point instances intact
  // Note: Undefined behaviour for sparse grids
  flipX() {
    const { minX, maxX } = this;
    for (const point of this.points) {
      const { x: current, y } = point;
      const offset = Math.abs(minX - current);
      const x = maxX - offset;
      point.x = x;
      this.setPoint(x, y, point);
    }
  }

  // Rotates this grid 90 degrees clock-wise keeping point instances intact
  // Note: Undefined behaviour for sparse grids
  rotate() {
    this.transpose();
    this.flipX();
  }

  // Tranposes this grid swapping rows and columns keeping point instances intact
  // Note: Undefined behaviour for sparse grids
  transpose() {
    for (const point of this.points) {
      const { x, y } = point;
      if (x === y) continue;
      if (this.getPoint(x, y) === point) {
        this.remove(x, y);
      }
      point.x = y;
      point.y = x;
      this.setPoint(y, x, point);
    }
  }

  toString(renderer = (point) => (point ? point.value : ' ')) {
    const {
      minY,
      maxY,
      minX,
      maxX,
    } = this;

    let string = '';
    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        string += renderer(this.getPoint(x, y));
      }
      string += '\n';
    }
    return string;
  }

  static from(gfx, {
    ignoreBlanks = true,
    pointClass,
    splitter = '',
    cast,
  } = {}) {
    const grid = new this({ pointClass });
    const lines = gfx.split('\n');
    lines.forEach((line, y) => {
      line.split(splitter).forEach((value, x) => {
        if (ignoreBlanks && value === ' ') {
          return;
        }
        grid.set(x, y, cast ? cast(value) : value);
      });
    });
    return grid;
  }
}

export default Grid;
export { Point as GridPoint };
