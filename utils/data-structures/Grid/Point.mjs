import { distance2D } from '../../navigation';

class Point {
  constructor(grid, x = 0, y = 0, value = undefined) {
    this.x = x;
    this.y = y;
    this.value = value;

    Object.defineProperty(this, 'grid', {
      enumerable: false,
      value: grid,
    });
  }

  clone() {
    return new this.constructor(
      this.grid,
      this.x,
      this.y,
      this.value,
    );
  }

  distanceTo(x, y) {
    return distance2D(this.x, this.y, x, y);
  }

  distanceToPoint(other) {
    return distance2D(this.x, this.y, other.x, other.y);
  }

  get adjacentNeighbors() {
    return [
      this.up,
      this.down,
      this.left,
      this.right,
    ].filter(Boolean);
  }

  get neighbors() {
    const { grid, x, y } = this;
    return [
      grid.getPoint(x - 1, y - 1), this.up, grid.getPoint(x + 1, y - 1),
      this.left, this.right,
      grid.getPoint(x - 1, y + 1), this.down, grid.getPoint(x + 1, y + 1),
    ].filter(Boolean);
  }

  get label() {
    return `(${this.y},${this.x})`;
  }

  get down() {
    return this.grid.getPoint(this.x, this.y + 1);
  }

  get up() {
    return this.grid.getPoint(this.x, this.y - 1);
  }

  get left() {
    return this.grid.getPoint(this.x - 1, this.y);
  }

  get right() {
    return this.grid.getPoint(this.x + 1, this.y);
  }
}

export default Point;
