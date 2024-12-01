import {
  Orientation, Rotation, normalizeOrientation, isHorizontalRotation, isSameOrientation,
} from '../../utils/index.js';

class TileSide {
  constructor(tile, rotation) {
    this.tile = tile;
    this.rotation = rotation;

    // Which tile this side connects to (if any, undefined if not yet known)
    this.other = undefined;
  }

  // Whether this tile side has resolved its connection
  get isResolved() {
    return this.other !== undefined;
  }

  get orientation() {
    return this.tile.orientation + this.rotation;
  }

  // Retrieves the raw string representation of this side directly from the grid
  get raw() {
    const { grid } = this.tile;
    const { orientation } = this;

    if (isSameOrientation(orientation, Orientation.UP)) {
      return grid.row(0).join('');
    }
    if (isSameOrientation(orientation, Orientation.DOWN)) {
      return grid.row(9).reverse().join('');
    }
    if (isSameOrientation(orientation, Orientation.LEFT)) {
      return grid.column(0).reverse().join('');
    }
    if (isSameOrientation(orientation, Orientation.RIGHT)) {
      return grid.column(9).join('');
    }
    return null;
  }

  // Flips this side's local rotation if it is a horizontal side
  flipX() {
    if (isHorizontalRotation(this.rotation)) {
      this.rotation = normalizeOrientation(this.rotation + Rotation.TURN_AROUND);
    }
  }
}

export default TileSide;
