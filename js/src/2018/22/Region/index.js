import RegionWithTool from './WithTool.js';
import Type from './Type.js';

class Region {
  constructor(cave, x, y) {
    this.cave = cave;
    this.x = x;
    this.y = y;

    this.isMouth = false;
    this.isTarget = false;

    // Cached properties
    this._geologicIndex = null;
    this._withTools = null;
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

  get neighbors() {
    const { width, height } = this.cave;
    return [
      this.y > 0 ? this.cave.grid[this.y - 1][this.x] : null,
      this.x > 0 ? this.cave.grid[this.y][this.x - 1] : null,
      this.x < width - 1 ? this.cave.grid[this.y][this.x + 1] : null,
      this.y < height - 1 ? this.cave.grid[this.y + 1][this.x] : null,
    ].filter(Boolean);
  }

  get riskLevel() {
    return this.type;
  }

  get type() {
    return this.erosionLevel % 3;
  }

  get visual() {
    const { isMouth, isTarget, type } = this;
    if (isMouth) return 'M';
    if (isTarget) return 'T';
    if (type === Type.ROCKY) return '.';
    if (type === Type.WET) return '=';
    if (type === Type.NARROW) return '|';
    return '?';
  }

  get withTools() {
    this._withTools = this._withTools || RegionWithTool.for(this);
    return this._withTools;
  }

  withTool(tool) {
    return this.withTools.find((rwt) => rwt.tool === tool);
  }
}

export default Region;
export { Type };
