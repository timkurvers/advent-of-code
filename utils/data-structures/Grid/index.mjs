import { flatMap } from '..';

import Point from './Point';

class Grid {
  constructor(pointClass = Point) {
    this.rows = new Map();
    this.pointClass = pointClass;
  }

  get center() {
    const { pointClass: PointClass, width, height } = this;
    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);
    return new PointClass(this, x, y);
  }

  get xs() {
    return flatMap(Array.from(this.rows.values()), row => (
      Array.from(row.keys())
    ));
  }

  get ys() {
    return Array.from(this.rows.keys());
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
    return this.maxX - this.minX + 1;
  }

  get height() {
    return this.maxY - this.minY + 1;
  }

  each(callback) {
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

  toString(renderer = point => (point ? point.value : ' '), opts = {}) {
    const {
      minY = this.minY,
      maxY = this.maxY,
      minX = this.minX,
      maxX = this.maxX,
    } = opts;

    let string = '';
    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        string += renderer(this.getPoint(x, y));
      }
      string += '\n';
    }
    return string;
  }

  static from(gfx, { ignoreBlanks = true } = {}) {
    const grid = new this();
    const lines = gfx.split('\n');
    lines.forEach((line, y) => {
      line.split('').forEach((value, x) => {
        if (value === ' ' && ignoreBlanks) {
          return;
        }
        grid.set(x, y, value);
      });
    });
    return grid;
  }
}

Grid.prototype.map = Grid.prototype.each;

export default Grid;
export { Point as GridPoint };
