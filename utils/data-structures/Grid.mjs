import { flatMap } from '.';

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
}

export default Grid;
