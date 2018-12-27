const Type = {
  SPRING: 1,
  OBSTRUCTED: 2,
  WATER_STILL: 3,
  WATER_FLOWING_DOWN: 4,
  WATER_FLOWING_LEFT: 5,
  WATER_FLOWING_RIGHT: 6,
};

class Tile {
  constructor(ground, x, y) {
    this.ground = ground;
    this.x = x;
    this.y = y;
    this.type = null;
  }

  get down() {
    const { ground } = this;
    return this.y < ground.maxY ? ground.grid[this.y + 1][this.x] : null;
  }

  get isWater() {
    return this.type === Type.WATER_STILL
           || this.type === Type.WATER_FLOWING_DOWN
           || this.type === Type.WATER_FLOWING_LEFT
           || this.type === Type.WATER_FLOWING_RIGHT;
  }

  get isStillWater() {
    return this.type === Type.WATER_STILL;
  }

  get isHorizontalFlowingWater() {
    return this.type === Type.WATER_FLOWING_LEFT
           || this.type === Type.WATER_FLOWING_RIGHT;
  }

  get label() {
    return `(${this.y},${this.x})`;
  }

  get left() {
    const { ground } = this;
    return this.x > 0 ? ground.grid[this.y][this.x - 1] : null;
  }

  get right() {
    const { ground } = this;
    return this.x < ground.maxX ? ground.grid[this.y][this.x + 1] : null;
  }

  get up() {
    const { ground } = this;
    return this.y > 0 ? ground.grid[this.y - 1][this.x] : null;
  }
}

export default Tile;
export { Type };
