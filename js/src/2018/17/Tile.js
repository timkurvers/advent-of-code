import { GridPoint } from '../../utils/index.js';

const Type = {
  SPRING: 1,
  OBSTRUCTED: 2,
  WATER_STILL: 3,
  WATER_FLOWING_DOWN: 4,
  WATER_FLOWING_LEFT: 5,
  WATER_FLOWING_RIGHT: 6,
};

class Tile extends GridPoint {
  get type() {
    return this.value;
  }

  set type(type) {
    this.value = type;
  }

  get isWater() {
    return (
      this.type === Type.WATER_STILL ||
      this.type === Type.WATER_FLOWING_DOWN ||
      this.type === Type.WATER_FLOWING_LEFT ||
      this.type === Type.WATER_FLOWING_RIGHT
    );
  }

  get isStillWater() {
    return this.type === Type.WATER_STILL;
  }

  get isHorizontalFlowingWater() {
    return this.type === Type.WATER_FLOWING_LEFT || this.type === Type.WATER_FLOWING_RIGHT;
  }
}

export default Tile;
export { Type };
