import Region, { Type } from './Region';

class Cave {
  constructor(definition) {
    [
      this.depth,
      this.targetX,
      this.targetY = this.targetX,
    ] = definition.match(/\d+/g).map(Number);

    this.regions = [];

    this.grid = [];
    for (let y = 0; y <= this.targetY; ++y) {
      this.grid[y] = [];
      for (let x = 0; x <= this.targetX; ++x) {
        const region = new Region(this, x, y);
        this.grid[y][x] = region;
        this.regions.push(region);
      }
    }

    // Mark mouth of the cave and target regions
    this.grid[0][0].isMouth = true;
    this.grid[this.targetY][this.targetX].isTarget = true;
  }

  get visual() {
    return this.grid.map(row => (
      row.map(({ type, isMouth, isTarget }) => {
        if (isMouth) return 'M';
        if (isTarget) return 'T';
        if (type === Type.ROCKY) return '.';
        if (type === Type.WET) return '=';
        if (type === Type.NARROW) return '|';
        return '?';
      }).join('')
    )).join('\n');
  }
}

export default Cave;
