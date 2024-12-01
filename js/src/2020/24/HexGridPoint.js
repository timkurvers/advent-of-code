import { GridPoint } from '../../utils/index.js';

// Represent a hex grid using axial coordinates
// See: https://www.redblobgames.com/grids/hexagons/
class HexGridPoint extends GridPoint {
  get q() {
    return this.x;
  }

  set q(q) {
    this.x = q;
  }

  get r() {
    return this.y;
  }

  set r(r) {
    this.y = r;
  }

  get e() {
    return this.explore(1, 0);
  }

  get ne() {
    return this.explore(1, -1);
  }

  get nw() {
    return this.explore(0, -1);
  }

  get se() {
    return this.explore(0, 1);
  }

  get sw() {
    return this.explore(-1, 1);
  }

  get w() {
    return this.explore(-1, 0);
  }

  get neighbors() {
    return [this.nw, this.ne, this.w, this.e, this.sw, this.se];
  }

  // Explores hex grid in given direction. If the target point does not yet
  // exist, it is initialized with a default value
  explore(dq, dr) {
    const q = this.q + dq;
    const r = this.r + dr;
    let point = this.grid.getPoint(q, r);
    if (!point) {
      point = this.grid.set(q, r);
    }
    return point;
  }

  // Touches this hex grid point to ensure its neighbors are revealed
  touch() {
    this.neighbors; // eslint-disable-line no-unused-expressions
  }
}

export default HexGridPoint;
