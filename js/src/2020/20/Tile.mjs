import {
  Orientation, Rotation, isSameOrientation, reverse,
} from '../../utils';

import TileSide from './TileSide';

class Tile {
  constructor(id, grid) {
    this.id = id;
    this.grid = grid;
    this.orientation = Orientation.UP;

    // Holds sides of this tile marked with how they are attached to this tile
    this.sides = [
      new TileSide(this, Rotation.NONE),
      new TileSide(this, Rotation.TURN_RIGHT),
      new TileSide(this, Rotation.TURN_AROUND),
      new TileSide(this, Rotation.TURN_LEFT),
    ];
  }

  // Whether this tile is a corner tile (only two of its sides are connected)
  get isCorner() {
    return this.sides.filter((side) => side.isResolved).length === 2;
  }

  // Whether this tile is resolved
  get isResolved() {
    return this.sides.every((side) => side.isResolved);
  }

  // Attempts to connect this tile to given tile (if possible), transforming the
  // other tile, annotating the sides and returning the connecting side
  connect(other) {
    if (this === other) return null;

    for (const side of this.sides) {
      if (side.isResolved) continue;

      for (const oside of other.sides) {
        if (oside.isResolved) continue;

        let match = side.raw === reverse(oside.raw);
        if (side.raw === oside.raw) {
          match = true;
          other.flipX();
        }
        if (match) {
          side.other = oside;
          oside.other = side;

          // Rotate the other tile as long as it is not in the right orientation
          const target = side.orientation + Rotation.TURN_AROUND;
          while (!isSameOrientation(oside.orientation, target)) {
            other.rotate();
          }
          return side;
        }
      }
    }
    return null;
  }

  flipX() {
    this.grid.flipX();
    for (const side of this.sides) {
      side.flipX();
    }
  }

  rotate() {
    this.orientation += Rotation.TURN_RIGHT;
    this.grid.rotate();
  }
}

export default Tile;
