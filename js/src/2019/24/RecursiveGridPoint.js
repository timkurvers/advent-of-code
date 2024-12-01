/* eslint-disable no-multi-spaces */

import { GridNDPoint } from '../../utils/index.js';

// Indices to mark the outer and inner ring in a 5x5 grid
const OUTER_RING_MIN = 0;
const OUTER_RING_MAX = 4;
const INNER_RING_MIN = 1;
const INNER_RING_MAX = 3;
const CENTER = 2;

class RecursiveGridPoint extends GridNDPoint.for(['x', 'y', 'z']) {
  // Finds or creates point with given location
  visit(x, y, z) {
    const position = [x, y, z];
    return this.grid.getPoint(position) || this.grid.set(position, '.');
  }

  get adjacentNeighbors() {
    const { x, y, z } = this;
    const neighbors = [];

    // Up neighbor(s) for this tile
    if (y === OUTER_RING_MIN) {
      neighbors.push(this.visit(CENTER, INNER_RING_MIN, z - 1));
    } else if (y === INNER_RING_MAX && x === CENTER) {
      neighbors.push(
        this.visit(OUTER_RING_MIN, OUTER_RING_MAX, z + 1),
        this.visit(INNER_RING_MIN, OUTER_RING_MAX, z + 1),
        this.visit(CENTER, OUTER_RING_MAX, z + 1),
        this.visit(INNER_RING_MAX, OUTER_RING_MAX, z + 1),
        this.visit(OUTER_RING_MAX, OUTER_RING_MAX, z + 1),
      );
    } else {
      neighbors.push(this.up);
    }

    // Down neighbor(s) for this tile
    if (y === OUTER_RING_MAX) {
      neighbors.push(this.visit(CENTER, INNER_RING_MAX, z - 1));
    } else if (y === INNER_RING_MIN && x === CENTER) {
      neighbors.push(
        this.visit(OUTER_RING_MIN, OUTER_RING_MIN, z + 1),
        this.visit(INNER_RING_MIN, OUTER_RING_MIN, z + 1),
        this.visit(CENTER, OUTER_RING_MIN, z + 1),
        this.visit(INNER_RING_MAX, OUTER_RING_MIN, z + 1),
        this.visit(OUTER_RING_MAX, OUTER_RING_MIN, z + 1),
      );
    } else {
      neighbors.push(this.down);
    }

    // Left neighbor(s) for this tile
    if (x === OUTER_RING_MIN) {
      neighbors.push(this.visit(INNER_RING_MIN, CENTER, z - 1));
    } else if (x === INNER_RING_MAX && y === CENTER) {
      neighbors.push(
        this.visit(OUTER_RING_MAX, OUTER_RING_MIN, z + 1),
        this.visit(OUTER_RING_MAX, INNER_RING_MIN, z + 1),
        this.visit(OUTER_RING_MAX, CENTER, z + 1),
        this.visit(OUTER_RING_MAX, INNER_RING_MAX, z + 1),
        this.visit(OUTER_RING_MAX, OUTER_RING_MAX, z + 1),
      );
    } else {
      neighbors.push(this.left);
    }

    // Right neighbor(s) for this tile
    if (x === OUTER_RING_MAX) {
      neighbors.push(this.visit(INNER_RING_MAX, CENTER, z - 1));
    } else if (x === INNER_RING_MIN && y === CENTER) {
      neighbors.push(
        this.visit(OUTER_RING_MIN, OUTER_RING_MIN, z + 1),
        this.visit(OUTER_RING_MIN, INNER_RING_MIN, z + 1),
        this.visit(OUTER_RING_MIN, CENTER, z + 1),
        this.visit(OUTER_RING_MIN, INNER_RING_MAX, z + 1),
        this.visit(OUTER_RING_MIN, OUTER_RING_MAX, z + 1),
      );
    } else {
      neighbors.push(this.right);
    }

    return neighbors.filter(Boolean);
  }

  get up() {
    return this.visit(this.x, this.y - 1, this.z);
  }

  get down() {
    return this.visit(this.x, this.y + 1, this.z);
  }

  get left() {
    return this.visit(this.x - 1, this.y, this.z);
  }

  get right() {
    return this.visit(this.x + 1, this.y, this.z);
  }
}

export default RecursiveGridPoint;
