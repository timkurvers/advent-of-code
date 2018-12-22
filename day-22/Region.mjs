const Type = {
  ROCKY: 0,
  WET: 1,
  NARROW: 2,
};

class Region {
  constructor(cave, x, y) {
    this.cave = cave;
    this.x = x;
    this.y = y;

    this.isMouth = false;
    this.isTarget = false;

    // Cached properties
    this._geologicIndex = null;
  }

  calculateGeologicIndex() {
    if (this.isMouth || this.isTarget) return 0;
    if (this.y === 0) {
      return this.x * 16807;
    }
    if (this.x === 0) {
      return this.y * 48271;
    }
    const left = this.cave.grid[this.y][this.x - 1];
    const up = this.cave.grid[this.y - 1][this.x];
    return left.erosionLevel * up.erosionLevel;
  }

  get erosionLevel() {
    return (this.geologicIndex + this.cave.depth) % 20183;
  }

  get geologicIndex() {
    this._geologicIndex = this._geologicIndex || this.calculateGeologicIndex();
    return this._geologicIndex;
  }

  get label() {
    return `(${this.x},${this.y})`;
  }

  get riskLevel() {
    return this.type;
  }

  get type() {
    return this.erosionLevel % 3;
  }
}

export default Region;
export { Type };
