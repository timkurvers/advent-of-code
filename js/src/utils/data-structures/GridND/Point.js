import Cache from '../Cache.js';
import { dfor } from '../../math.js';

// Holds matrices with deltas on how to reach neighbors for each dimension
const neighborMatrices = new Cache({
  init: (n) => {
    const boundaries = Array.from({ length: n }, () => ({ min: -1, max: 1 }));

    // Use dynamic for-loops to generate this matrix, excluding self (0, 0, ...)
    const matrix = [];
    for (const deltas of dfor(boundaries)) {
      if (!deltas.every((value) => value === 0)) {
        matrix.push(deltas);
      }
    }
    return matrix;
  },
});

class Point {
  constructor(grid, position, value = undefined) {
    this.position = position;
    this.value = value;

    Object.defineProperty(this, 'grid', {
      enumerable: false,
      value: grid,
    });
  }

  clone() {
    return new this.constructor(this.grid, this.position, this.value);
  }

  get neighbors() {
    const { grid, position } = this;

    const matrix = neighborMatrices.lookup(grid.numDimensions);
    return matrix.reduce((list, deltas) => {
      const adjusted = deltas.reduce((tmp, delta, index) => {
        tmp.push(position[index] + delta);
        return tmp;
      }, []);
      const point = grid.getPoint(adjusted);
      if (point) {
        list.push(point);
      }
      return list;
    }, []);
  }

  get label() {
    return `(${this.position.join(',')})`;
  }

  static for(dimensions) {
    const PointClass = class extends this {};
    for (const [index, prop] of dimensions.entries()) {
      Object.defineProperty(PointClass.prototype, prop, {
        get() {
          return this.position[index];
        },
      });
    }
    return PointClass;
  }
}

export default Point;
