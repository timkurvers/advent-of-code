import { GridPoint } from '../../utils/index.js';

class CompassPoint extends GridPoint {
  get n() {
    return this.grid.get(this.x, this.y - 1);
  }

  get ne() {
    return this.grid.get(this.x + 1, this.y - 1);
  }

  get nw() {
    return this.grid.get(this.x - 1, this.y - 1);
  }

  get s() {
    return this.grid.get(this.x, this.y + 1);
  }

  get se() {
    return this.grid.get(this.x + 1, this.y + 1);
  }

  get sw() {
    return this.grid.get(this.x - 1, this.y + 1);
  }

  get e() {
    return this.grid.get(this.x + 1, this.y);
  }

  get w() {
    return this.grid.get(this.x - 1, this.y);
  }
}

export default CompassPoint;
