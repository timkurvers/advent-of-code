import { distance2D } from '../../utils/navigation.js';

class Coord {
  constructor(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.entity = null;
  }

  get label() {
    return `(${this.y},${this.x})`;
  }

  get neighbors() {
    const { width, height } = this.map;
    return [
      this.y > 0 ? this.map.grid[this.y - 1][this.x] : null,
      this.x > 0 ? this.map.grid[this.y][this.x - 1] : null,
      this.x < width - 1 ? this.map.grid[this.y][this.x + 1] : null,
      this.y < height - 1 ? this.map.grid[this.y + 1][this.x] : null,
    ].filter(Boolean);
  }

  get unoccupiedNeighbors() {
    return this.neighbors.filter((coord) => !coord.entity);
  }

  distanceTo(other) {
    return distance2D(this.x, this.y, other.x, other.y);
  }
}

export default Coord;
