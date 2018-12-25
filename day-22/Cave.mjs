/* eslint-disable prefer-destructuring */

import Region from './Region';

class Cave {
  constructor(definition) {
    [
      this.depth,
      this.targetX,
      this.targetY = this.targetX,
    ] = definition.match(/\d+/g).map(Number);

    this.width = Math.ceil(this.targetX * 7);
    this.height = Math.ceil(this.targetY * 1.5);

    this.regions = [];
    this.grid = [];
    for (let y = 0; y <= this.height; ++y) {
      this.grid[y] = [];
      for (let x = 0; x <= this.width; ++x) {
        const region = new Region(this, x, y);
        this.grid[y][x] = region;
        this.regions.push(region);
      }
    }

    // Mark mouth of the cave and target regions
    this.mouth = this.grid[0][0];
    this.mouth.isMouth = true;
    this.target = this.grid[this.targetY][this.targetX];
    this.target.isTarget = true;
  }

  get visual() {
    return this.grid.map(row => (
      row.map(region => region.visual).join('')
    )).join('\n');
  }
}

export default Cave;
