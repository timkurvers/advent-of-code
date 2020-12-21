import { dfor } from '../../math';

import Point from './Point';

class GridND {
  constructor(dimensions, pointClass = Point) {
    this.dimensions = dimensions;
    this.data = new Map();
    this.pointClass = pointClass;
  }

  get numDimensions() {
    return this.dimensions.length;
  }

  dimensionIndexFor(dimension) {
    if (dimension in this.dimensions) {
      return dimension;
    }
    return this.dimensions.indexOf(dimension);
  }

  min(dimension) {
    const positions = this.positions(dimension);
    return positions.length ? Math.min(...positions) : undefined;
  }

  max(dimension) {
    const positions = this.positions(dimension);
    return positions.length ? Math.max(...positions) : undefined;
  }

  positions(dimension) {
    const index = this.dimensionIndexFor(dimension);
    const positions = this.map((point) => point.position[index]);
    return [...new Set(positions)];
  }

  size(dimension) {
    const min = this.min(dimension);
    const max = this.max(dimension);
    return min !== undefined ? max - min + 1 : 0;
  }

  get points() {
    return Array.from(this.data.values());
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
    for (const point of this.data.values()) {
      mapped.push(callback(point, point.position));
    }
    return mapped;
  }

  fill(boundaries, value, { overwrite = false } = {}) {
    for (const position of dfor(boundaries)) {
      if (overwrite || !this.getPoint(position)) {
        this.set(position, value);
      }
    }
  }

  filter(condition) {
    const filtered = [];
    for (const point of this.data.values()) {
      if (condition(point, point.position)) {
        filtered.push(point);
      }
    }
    return filtered;
  }

  find(condition) {
    for (const point of this.data.values()) {
      if (condition(point, point.position)) {
        return point;
      }
    }
    return null;
  }

  get(position) {
    const point = this.getPoint(position);
    return point && point.value;
  }

  getPoint(position) {
    const key = position.toString();
    const point = this.data.get(key);
    return point;
  }

  pad(padding, value) {
    const boundaries = this.dimensions.reduce((list, dimension) => {
      const min = this.min(dimension);
      const max = this.max(dimension);
      list.push({ min: min - padding, max: max + padding });
      return list;
    }, []);
    this.fill(boundaries, value);
  }

  set(position, value = true) {
    const { data, pointClass: PointClass } = this;

    const key = position.toString();
    let point = data.get(key);
    if (!point) {
      point = new PointClass(this, position);
      data.set(key, point);
    }
    point.value = value;
    return point;
  }

  // Note: Assumes first two dimensions to be visualized (for now)
  toString(descriptor = {}, renderer = (point) => (point ? point.value : ' ')) {
    const position = [...this.dimensions].fill(0);
    for (const [prop, value] of Object.entries(descriptor)) {
      const index = this.dimensionIndexFor(prop);
      position[index] = value;
    }

    const minD0 = this.min(0);
    const maxD0 = this.max(0);
    const minD1 = this.min(1);
    const maxD1 = this.max(1);

    let string = '';
    for (let d1 = minD1; d1 <= maxD1; ++d1) {
      for (let d0 = minD0; d0 <= maxD0; ++d0) {
        position[0] = d0;
        position[1] = d1;
        string += renderer(this.getPoint(position));
      }
      string += '\n';
    }
    return string;
  }

  // Note: Assumes gfx given represents first two dimensions in given list (for now)
  static from(gfx, dimensions, { ignoreBlanks = true, pointClass } = {}) {
    const grid = new this(dimensions, pointClass);
    const lines = gfx.split('\n');
    lines.forEach((line, d1) => {
      line.split('').forEach((value, d0) => {
        if (value === ' ' && ignoreBlanks) {
          return;
        }
        const position = [...dimensions].fill(0);
        position[0] = d0;
        position[1] = d1;
        grid.set(position, value);
      });
    });
    return grid;
  }
}

export default GridND;
export { Point as GridNDPoint };
